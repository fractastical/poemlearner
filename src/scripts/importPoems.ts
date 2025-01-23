import { importLocalPoems, importPoems, sources } from '../services/poemImporter';

async function main() {
  try {
    // First import local poems
    await importLocalPoems();
    
    // Then import from external sources
    for (const source of Object.values(sources)) {
      await importPoems(source);
    }
    
    console.log('All poems imported successfully!');
  } catch (error) {
    console.error('Error importing poems:', error);
    process.exit(1);
  }
}

main();