import { createClient } from '@supabase/supabase-js';

// API endpoints
const POETRY_DB_API = 'https://poetrydb.org';
const DBNL_API = 'https://api.dbnl.org/v1';
const DEUTSCHE_LYRIK_API = 'https://deutschelyrik.de/api/v1';
const RUSSIAN_POETRY_API = 'https://russianpoetry.ru/api';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface ExternalPoem {
  title: string;
  author: string;
  content: string;
  year?: string;
  collection?: string;
}

// Fetch complete poem from various sources based on language and metadata
export async function fetchCompletePoem(
  title: string,
  author: string,
  language: string
): Promise<ExternalPoem | null> {
  try {
    // First check if we already have the complete version in Supabase
    const { data: existingPoems, error } = await supabase
      .from('poems')
      .select('*')
      .eq('title', title)
      .eq('author', author)
      .eq('language', language);

    if (error) {
      console.error('Error fetching from Supabase:', error);
    } else if (existingPoems && existingPoems.length > 0) {
      const completePoem = existingPoems.find(poem => poem.content.split('\n').length > 4);
      if (completePoem) {
        return completePoem;
      }
    }

    // If not in database, try external APIs based on language
    let poem: ExternalPoem | null = null;

    switch (language) {
      case 'dutch':
        poem = await fetchFromDBNL(title, author);
        break;
      case 'german':
        poem = await fetchFromDeutscheLyrik(title, author);
        break;
      case 'russian':
        poem = await fetchFromRussianPoetry(title, author);
        break;
      default:
        poem = await fetchFromPoetryDB(title, author);
    }

    if (poem) {
      // Store the complete version in Supabase for future use
      const { error: upsertError } = await supabase
        .from('poems')
        .upsert({
          title: poem.title,
          author: poem.author,
          content: poem.content,
          year: poem.year,
          collection: poem.collection,
          language,
          external_id: `fetched_${Date.now()}`
        });

      if (upsertError) {
        console.error('Error upserting poem to Supabase:', upsertError);
      }
    }

    return poem;
  } catch (error) {
    console.error('Error fetching complete poem:', error);
    return null;
  }
}

async function fetchFromDBNL(title: string, author: string): Promise<ExternalPoem | null> {
  try {
    const response = await fetch(
      `${DBNL_API}/texts?type=poetry&title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.items[0] || null;
  } catch (error) {
    console.error('Error fetching from DBNL:', error);
    return null;
  }
}

async function fetchFromDeutscheLyrik(title: string, author: string): Promise<ExternalPoem | null> {
  try {
    const response = await fetch(
      `${DEUTSCHE_LYRIK_API}/poems?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.poem || null;
  } catch (error) {
    console.error('Error fetching from Deutsche Lyrik:', error);
    return null;
  }
}

async function fetchFromRussianPoetry(title: string, author: string): Promise<ExternalPoem | null> {
  try {
    const response = await fetch(
      `${RUSSIAN_POETRY_API}/poems?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.poem || null;
  } catch (error) {
    console.error('Error fetching from Russian Poetry:', error);
    return null;
  }
}

async function fetchFromPoetryDB(title: string, author: string): Promise<ExternalPoem | null> {
  try {
    const response = await fetch(
      `${POETRY_DB_API}/title,author/${encodeURIComponent(title)};${encodeURIComponent(author)}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error('Error fetching from PoetryDB:', error);
    return null;
  }
}