import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Poem } from '../types';

interface PoemDisplayProps {
  poem: Poem;
  onWordClick: (word: string, definition: string) => void;
}

export function PoemDisplay({ poem, onWordClick }: PoemDisplayProps) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>('');

  const handleWordClick = (word: string, definition: string) => {
    onWordClick(word, definition);
    setRecentlyAdded(word);
    setTimeout(() => setRecentlyAdded(null), 1000);
  };

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim()) {
        setSelectedText(selection.toString().trim());
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  // Handle when Google Translate popup appears
  useEffect(() => {
    const handleTranslation = (e: MessageEvent) => {
      if (e.data && e.data.target === 'googtrans' && selectedText) {
        // Google Translate sends the translation in e.data.translation
        const translation = e.data.translation;
        if (translation) {
          handleWordClick(selectedText, translation);
        }
      }
    };

    window.addEventListener('message', handleTranslation);
    return () => window.removeEventListener('message', handleTranslation);
  }, [selectedText, onWordClick]);

  // Split the content into lines and process each line
  const lines = poem.content.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-2">{poem.title}</h2>
      <p className="text-gray-600 mb-4">by {poem.author}</p>
      <div className="whitespace-pre-wrap font-serif leading-relaxed">
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="mb-2">
            {line.split(/\s+/).map((word, wordIndex) => {
              const cleanWord = word.replace(/[.,!?]/g, '');
              const hasTranslation = poem.translations[cleanWord];
              const isRecentlyAdded = recentlyAdded === cleanWord;
              
              return (
                <React.Fragment key={`${lineIndex}-${wordIndex}`}>
                  <span
                    className={`relative inline-block transition-all duration-300 ${
                      hasTranslation
                        ? 'cursor-pointer hover:bg-yellow-100'
                        : ''
                    } ${
                      isRecentlyAdded
                        ? 'animate-pulse bg-green-200'
                        : ''
                    }`}
                    onMouseEnter={() => hasTranslation && setHoveredWord(cleanWord)}
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={() => {
                      if (hasTranslation) {
                        handleWordClick(cleanWord, poem.translations[cleanWord]);
                      }
                    }}
                  >
                    {word}
                    {hoveredWord === cleanWord && (
                      <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max">
                        <div className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 shadow-lg">
                          <span>{poem.translations[cleanWord]}</span>
                          <Plus size={16} className={`text-gray-300 ${isRecentlyAdded ? 'text-green-400' : ''}`} />
                        </div>
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full">
                          <div className="border-8 border-transparent border-t-gray-900 w-0 h-0" />
                        </div>
                      </div>
                    )}
                  </span>
                  {wordIndex < line.split(/\s+/).length - 1 && ' '}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-blue-600">
        Tip: Select any text to translate with Google Translate and add it to your word list
      </div>
    </div>
  );
}