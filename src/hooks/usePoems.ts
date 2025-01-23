import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { Poem } from '../types';
import { poems as localPoems } from '../data/poems';

const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function usePoems(language: string) {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPoems() {
      try {
        setLoading(true);
        
        // Get local poems for the selected language
        const filteredLocalPoems = localPoems.filter(poem => poem.language === language);
        
        // Fetch additional poems from Supabase
        const { data: dbPoems, error } = await supabase
          .from('poems')
          .select(`
            *,
            translations (
              word,
              translation
            )
          `)
          .eq('language', language);
          
        if (error) throw error;
        
        // Transform database poems to match our Poem type
        const transformedDbPoems: Poem[] = (dbPoems || []).map(poem => ({
          id: poem.id,
          title: poem.title,
          author: poem.author,
          content: poem.content,
          year: poem.year || undefined,
          collection: poem.collection || undefined,
          language: poem.language as any,
          translations: poem.translations.reduce((acc, t) => ({
            ...acc,
            [t.word]: t.translation
          }), {})
        }));
        
        // Combine local and database poems, ensuring no duplicates by ID
        const allPoems = [...filteredLocalPoems];
        
        // Only add DB poems that don't exist in local poems
        transformedDbPoems.forEach(dbPoem => {
          if (!allPoems.some(localPoem => localPoem.id === dbPoem.id)) {
            allPoems.push(dbPoem);
          }
        });
        
        // Sort poems by author and title
        const sortedPoems = allPoems.sort((a, b) => {
          const authorCompare = a.author.localeCompare(b.author);
          return authorCompare !== 0 ? authorCompare : a.title.localeCompare(b.title);
        });
        
        setPoems(sortedPoems);
      } catch (err) {
        console.error('Error fetching poems:', err);
        // Fallback to local poems on error
        setPoems(localPoems.filter(poem => poem.language === language));
        setError(err instanceof Error ? err.message : 'Failed to fetch poems');
      } finally {
        setLoading(false);
      }
    }

    fetchPoems();
  }, [language]);

  return { poems, loading, error };
}