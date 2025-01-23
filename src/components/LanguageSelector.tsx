import React from 'react';
import { Globe2 } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const languages: { value: Language; label: string }[] = [
    { value: 'dutch', label: 'Dutch' },
    { value: 'german', label: 'German' },
    { value: 'greek', label: 'Attic Greek' },
    { value: 'russian', label: 'Russian' },
    { value: 'italian', label: 'Italian' },
    { value: 'spanish', label: 'Spanish' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe2 className="text-indigo-600" size={20} />
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value as Language)}
        className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}