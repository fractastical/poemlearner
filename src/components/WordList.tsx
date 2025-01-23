import React from 'react';
import { Trash2 } from 'lucide-react';
import { Word, Language } from '../types';

interface WordListProps {
  words: Word[];
  currentLanguage: Language;
  onRemoveWord: (word: string) => void;
}

export function WordList({ words, currentLanguage, onRemoveWord }: WordListProps) {
  const filteredWords = words.filter((word) => word.language === currentLanguage);

  if (filteredWords.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No words saved yet for this language. Click on words in the poems to add them to your list.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredWords.map((word) => (
        <div
          key={word.word}
          className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-start"
        >
          <div>
            <h3 className="font-bold text-lg">{word.word}</h3>
            <p className="text-gray-600">{word.definition}</p>
            <p className="text-sm text-gray-400 mt-1">
              Added: {new Date(word.addedAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => onRemoveWord(word.word)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Remove word"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}