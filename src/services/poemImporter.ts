import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { poems as localPoems } from '../data/poems';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface PoemSource {
  id: string;
  name: string;
  baseUrl: string;
  fetchPoems: () => Promise<any[]>;
  transform: (data: any) => Promise<{
    externalId: string;
    title: string;
    author: string;
    content: string;
    year?: string;
    collection?: string;
    language: string;
    translations: Record<string, string>;
  }>;
}

// DBNL Poetry Source
const dbnlSource: PoemSource = {
  id: 'dbnl',
  name: 'Digitale Bibliotheek voor de Nederlandse Letteren',
  baseUrl: 'https://api.dbnl.org/v1',
  
  async fetchPoems() {
    const response = await fetch(
      `${this.baseUrl}/texts?type=poetry&language=dut&limit=100`
    );
    if (!response.ok) throw new Error('Failed to fetch DBNL poems');
    return response.json();
  },
  
  async transform(data) {
    // Transform DBNL data to our format
    const translations = await fetch(
      `${this.baseUrl}/translations/${data.id}`
    ).then(res => res.json());
    
    return {
      externalId: `dbnl_${data.id}`,
      title: data.title,
      author: data.author,
      content: data.content,
      year: data.year,
      collection: data.collection,
      language: 'dutch',
      translations: translations.translations || {}
    };
  }
};

// Project Gutenberg Poetry Source
const gutenbergSource: PoemSource = {
  id: 'gutenberg',
  name: 'Project Gutenberg',
  baseUrl: 'https://gutendex.com',
  
  async fetchPoems() {
    const response = await fetch(
      `${this.baseUrl}/books?topic=poetry&languages=de,el,ru,it`
    );
    if (!response.ok) throw new Error('Failed to fetch Gutenberg poems');
    return response.json();
  },
  
  async transform(data) {
    // Transform Gutenberg data to our format
    return {
      externalId: `gutenberg_${data.id}`,
      title: data.title,
      author: data.author,
      content: data.content,
      year: data.year,
      collection: data.collection,
      language: data.language,
      translations: {} // Would need to integrate with a translation service
    };
  }
};

// Import local poems first
export async function importLocalPoems() {
  try {
    console.log('Importing local poems...');
    
    for (const poem of localPoems) {
      const { error: poemError } = await supabase
        .from('poems')
        .upsert({
          external_id: `local_${poem.id}`,
          title: poem.title,
          author: poem.author,
          content: poem.content,
          year: poem.year,
          collection: poem.collection,
          language: poem.language
        })
        .select()
        .single();
        
      if (poemError) throw poemError;
      
      // Insert translations
      const translations = Object.entries(poem.translations).map(
        ([word, translation]) => ({
          poem_id: poem.id,
          word,
          translation
        })
      );
      
      if (translations.length > 0) {
        const { error: translationError } = await supabase
          .from('translations')
          .upsert(translations);
          
        if (translationError) throw translationError;
      }
    }
    
    console.log('Successfully imported local poems');
  } catch (error) {
    console.error('Error importing local poems:', error);
    throw error;
  }
}

export async function importPoems(source: PoemSource) {
  try {
    console.log(`Importing poems from ${source.name}...`);
    
    const poems = await source.fetchPoems();
    
    for (const poem of poems) {
      const transformedPoem = await source.transform(poem);
      
      // Skip if we already have this poem locally
      if (localPoems.some(p => p.id === transformedPoem.externalId)) {
        continue;
      }
      
      // Insert poem
      const { data: poemData, error: poemError } = await supabase
        .from('poems')
        .upsert({
          external_id: transformedPoem.externalId,
          title: transformedPoem.title,
          author: transformedPoem.author,
          content: transformedPoem.content,
          year: transformedPoem.year,
          collection: transformedPoem.collection,
          language: transformedPoem.language
        })
        .select()
        .single();
        
      if (poemError) throw poemError;
      
      // Insert translations
      const translations = Object.entries(transformedPoem.translations).map(
        ([word, translation]) => ({
          poem_id: poemData.id,
          word,
          translation
        })
      );
      
      if (translations.length > 0) {
        const { error: translationError } = await supabase
          .from('translations')
          .upsert(translations);
          
        if (translationError) throw translationError;
      }
    }
    
    console.log(`Successfully imported poems from ${source.name}`);
  } catch (error) {
    console.error(`Error importing poems from ${source.name}:`, error);
    throw error;
  }
}

export const sources = {
  dbnl: dbnlSource,
  gutenberg: gutenbergSource
};