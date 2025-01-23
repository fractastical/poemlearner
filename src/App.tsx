import React, { useState, useEffect } from 'react';
import { Book, BookOpen, CheckCircle2, Camera } from 'lucide-react';
import { PoemDisplay } from './components/PoemDisplay';
import { WordList } from './components/WordList';
import { LanguageSelector } from './components/LanguageSelector';
import { PoemScanner } from './components/PoemScanner';
import { Word, Language, ReadingProgress } from './types';
import { usePoems } from './hooks/usePoems';

function App() {
  const [savedWords, setSavedWords] = useState<Word[]>(() => {
    const saved = localStorage.getItem('savedWords');
    return saved ? JSON.parse(saved) : [];
  });

  const [readPoems, setReadPoems] = useState<ReadingProgress[]>(() => {
    const saved = localStorage.getItem('readPoems');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentLanguage, setCurrentLanguage] = useState<Language>('dutch');
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [showWordList, setShowWordList] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { poems: languagePoems, loading, error } = usePoems(currentLanguage);
  const currentPoem = languagePoems[currentPoemIndex];
  const isCurrentPoemRead = currentPoem && readPoems.some(p => p.poemId === currentPoem.id);
  const readPoemsCount = readPoems.filter(p => 
    languagePoems.find(poem => poem.id === p.poemId)
  ).length;

  useEffect(() => {
    localStorage.setItem('savedWords', JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem('readPoems', JSON.stringify(readPoems));
  }, [readPoems]);

  useEffect(() => {
    setCurrentPoemIndex(0);
  }, [currentLanguage]);

  const handleWordClick = (word: string, definition: string) => {
    if (!savedWords.some((w) => w.word === word && w.language === currentLanguage)) {
      setSavedWords([
        ...savedWords,
        { word, definition, addedAt: new Date().toISOString(), language: currentLanguage },
      ]);
    }
  };

  const handleRemoveWord = (word: string) => {
    setSavedWords(savedWords.filter((w) => !(w.word === word && w.language === currentLanguage)));
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const markAsRead = () => {
    if (currentPoem && !isCurrentPoemRead) {
      setReadPoems([...readPoems, {
        poemId: currentPoem.id,
        readAt: new Date().toISOString()
      }]);
    }
  };

  const handlePoemScanned = () => {
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Book className="text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Poetry Learning
              </h1>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <div className="text-sm text-gray-600 w-full sm:w-auto">
                Read {readPoemsCount} of {languagePoems.length} poems
              </div>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              <button
                onClick={() => setShowWordList(!showWordList)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <BookOpen size={20} />
                <span>{showWordList ? 'Show Poems' : 'Word List'}</span>
              </button>
              <button
                onClick={() => setShowScanner(!showScanner)}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Camera size={20} />
                <span>Scan Poem</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {showScanner ? (
          <PoemScanner
            onPoemScanned={handlePoemScanned}
            currentLanguage={currentLanguage}
          />
        ) : showWordList ? (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your Saved Words</h2>
            <WordList
              words={savedWords}
              currentLanguage={currentLanguage}
              onRemoveWord={handleRemoveWord}
            />
          </div>
        ) : currentPoem ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={() =>
                    setCurrentPoemIndex(
                      (prev) => (prev - 1 + languagePoems.length) % languagePoems.length
                    )
                  }
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  disabled={languagePoems.length <= 1}
                >
                  Previous Poem
                </button>
                <button
                  onClick={() =>
                    setCurrentPoemIndex((prev) => (prev + 1) % languagePoems.length)
                  }
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                  disabled={languagePoems.length <= 1}
                >
                  Next Poem
                </button>
              </div>
              <button
                onClick={markAsRead}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  isCurrentPoemRead 
                    ? 'bg-green-100 text-green-800 cursor-default'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
                disabled={isCurrentPoemRead}
              >
                <CheckCircle2 size={20} />
                <span>{isCurrentPoemRead ? 'Read' : 'Mark as Read'}</span>
              </button>
            </div>
            <PoemDisplay
              poem={currentPoem}
              onWordClick={handleWordClick}
            />
            {currentPoem.year && (
              <div className="text-sm text-gray-600">
                Published in {currentPoem.year}
                {currentPoem.collection && ` as part of "${currentPoem.collection}"`}
              </div>
            )}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Click on words to see their definitions and add them to your word list.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-600">
            No poems available for this language.
          </div>
        )}
      </main>
    </div>
  );
}

export default App;