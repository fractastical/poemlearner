export interface Word {
  word: string;
  definition: string;
  addedAt: string;
  language: string;
}

export interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  translations: {
    [key: string]: string;
  };
  language: string;
  year?: string;
  collection?: string;
}

export type Language = 'dutch' | 'german' | 'greek' | 'russian' | 'italian' | 'spanish';

export interface ReadingProgress {
  poemId: string;
  readAt: string;
}