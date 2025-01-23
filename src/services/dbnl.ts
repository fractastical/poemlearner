import { Poem } from '../types';

const DBNL_API_BASE = 'https://api.dbnl.org/v1';

interface DBNLPoem {
  id: string;
  title: string;
  author: string;
  year: string;
  collection: string;
  content: string;
}

export async function fetchPoemsFromDBNL(page = 1, limit = 20): Promise<Poem[]> {
  try {
    const response = await fetch(
      `${DBNL_API_BASE}/texts?type=poetry&language=dut&page=${page}&limit=${limit}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch poems from DBNL');
    }

    const data = await response.json();
    return data.items.map((item: DBNLPoem) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      year: item.year,
      collection: item.collection,
      content: item.content.replace(/\n/g, '\n'),
      language: 'dutch' as const,
      translations: {} // We'll need to implement translation fetching separately
    }));
  } catch (error) {
    console.error('Error fetching poems from DBNL:', error);
    return [];
  }
}

export async function fetchPoemTranslations(poemId: string): Promise<Record<string, string>> {
  try {
    const response = await fetch(
      `${DBNL_API_BASE}/translations/${poemId}`,
      {
        headers: {
          'Accept': 'application/json',
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch translations');
    }

    const data = await response.json();
    return data.translations;
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {};
  }
}