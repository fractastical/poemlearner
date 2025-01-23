import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Camera, Upload, Check, X, RefreshCw } from 'lucide-react';
import { Language } from '../types';
import { createWorker } from 'tesseract.js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const GOOGLE_CLOUD_VISION_API_KEY = import.meta.env.VITE_GOOGLE_CLOUD_VISION_API_KEY;
const GOOGLE_CLOUD_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

interface PoemScannerProps {
  onPoemScanned: () => void;
  currentLanguage: Language;
}

export function PoemScanner({ onPoemScanned, currentLanguage }: PoemScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [collection, setCollection] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map our language codes to Google Cloud Vision language hints
  const getGoogleLanguageHint = (language: Language): string => {
    const langMap: Record<Language, string> = {
      dutch: 'nl',
      german: 'de',
      greek: 'el',
      russian: 'ru',
      italian: 'it'
    };
    return langMap[language];
  };

  // Map our language codes to Tesseract language codes
  const getTesseractLanguageCode = (language: Language): string => {
    const langMap: Record<Language, string> = {
      dutch: 'nld',
      german: 'deu',
      greek: 'ell',
      russian: 'rus',
      italian: 'ita'
    };
    return langMap[language];
  };

  // Process image with Google Cloud Vision API
  const processWithGoogleVision = async (imageBase64: string): Promise<string> => {
    const response = await fetch(GOOGLE_CLOUD_VISION_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [{
          image: {
            content: imageBase64.split(',')[1]
          },
          features: [{
            type: 'TEXT_DETECTION',
            model: 'builtin/latest'
          }],
          imageContext: {
            languageHints: [getGoogleLanguageHint(currentLanguage)]
          }
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error processing image with Google Cloud Vision');
    }

    return data.responses[0]?.fullTextAnnotation?.text || '';
  };

  // Process image with Tesseract
  const processWithTesseract = async (imageBlob: Blob): Promise<string> => {
    const worker = await createWorker();
    await worker.loadLanguage(getTesseractLanguageCode(currentLanguage));
    await worker.initialize(getTesseractLanguageCode(currentLanguage));
    
    await worker.setParameters({
      tessedit_pageseg_mode: '6',
      preserve_interword_spaces: '1',
      tessedit_char_whitelist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäöüßÄÖÜ.,!?-:;\'\"()',
    });

    const imageUrl = URL.createObjectURL(imageBlob);
    const { data: { text } } = await worker.recognize(imageUrl);
    URL.revokeObjectURL(imageUrl);
    
    await worker.terminate();
    return text;
  };

  // Process image using available OCR service
  const processImage = async (imageBlob: Blob) => {
    setScanning(true);
    setError(null);
    
    try {
      let text: string;
      
      if (GOOGLE_CLOUD_VISION_API_KEY) {
        // Use Google Cloud Vision if API key is available
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(imageBlob);
        });
        
        text = await processWithGoogleVision(base64);
      } else {
        // Fall back to Tesseract if no API key
        text = await processWithTesseract(imageBlob);
      }

      // Clean up the text
      const cleanedText = text
        .replace(/\n{3,}/g, '\n\n')
        .replace(/[^\S\n]+/g, ' ')
        .trim();

      setScannedText(cleanedText);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error processing image. Please ensure the text is clear and well-lit.');
    } finally {
      setScanning(false);
    }
  };

  // Initialize camera
  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 2048 },
          height: { ideal: 1536 }
        }
      });
      setStream(mediaStream);
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Could not access camera. Please check permissions or try uploading an image instead.');
    }
  };

  // Set up video stream when stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error('Error playing video:', err);
        setError('Error starting video preview. Please try again.');
      });
    }
  }, [stream]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
    setError(null);
  }, [stream]);

  // Capture image from camera
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setError(null);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          blob => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create image blob'));
          },
          'image/jpeg',
          0.95
        );
      });

      await processImage(blob);
      stopCamera();
    } catch (err) {
      console.error('Error capturing image:', err);
      setError('Error capturing image. Please try again.');
    }
  };

  // Handle file upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError(null);
    
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file is too large. Please select an image under 10MB.');
      return;
    }
    
    await processImage(file);
  };

  // Save poem to database
  const handleSave = async () => {
    if (!title || !author || !scannedText) {
      setError('Please fill in the title, author, and ensure there is scanned text.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      const { data, error: supabaseError } = await supabase
        .from('poems')
        .insert({
          title,
          author,
          content: scannedText,
          year: year || null,
          collection: collection || null,
          language: currentLanguage,
          external_id: `scanned_${Date.now()}`
        })
        .select()
        .single();

      if (supabaseError) {
        throw supabaseError;
      }

      // Reset form
      setScannedText('');
      setTitle('');
      setAuthor('');
      setYear('');
      setCollection('');
      
      // Notify parent component
      onPoemScanned();
      
      alert('Poem saved successfully!');
    } catch (error) {
      console.error('Error saving poem:', error);
      setError('Error saving poem. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!showCamera ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startCamera}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Camera className="mr-2" />
              Take Photo
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Upload className="mr-2" />
              Upload Image
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <p className="text-sm text-gray-600">
            Using {GOOGLE_CLOUD_VISION_API_KEY ? 'Google Cloud Vision' : 'Tesseract.js'} for OCR
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={captureImage}
                className="p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Take photo"
              >
                <Camera className="w-6 h-6" />
              </button>
              <button
                onClick={stopCamera}
                className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                title="Cancel"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {scanning && (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="ml-2 text-gray-600">Processing image...</span>
        </div>
      )}

      {scannedText && (
        <div className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Collection</label>
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Scanned Text *</label>
            <textarea
              value={scannedText}
              onChange={(e) => setScannedText(e.target.value)}
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-mono"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              disabled={!title || !author || !scannedText || saving}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              ) : (
                <Check className="mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Poem'}
            </button>
            <button
              onClick={() => {
                setScannedText('');
                setTitle('');
                setAuthor('');
                setYear('');
                setCollection('');
                setError(null);
              }}
              className="flex-1 flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              disabled={saving}
            >
              <X className="mr-2" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}