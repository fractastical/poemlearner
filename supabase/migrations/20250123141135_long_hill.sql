/*
  # Poetry Database Schema

  1. New Tables
    - `poems`
      - `id` (uuid, primary key)
      - `external_id` (text, unique) - ID from external source
      - `title` (text)
      - `author` (text)
      - `content` (text)
      - `year` (text)
      - `collection` (text)
      - `language` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `translations`
      - `id` (uuid, primary key)
      - `poem_id` (uuid, foreign key)
      - `word` (text)
      - `translation` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
*/

-- Create poems table
CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  external_id text UNIQUE,
  title text NOT NULL,
  author text NOT NULL,
  content text NOT NULL,
  year text,
  collection text,
  language text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id uuid REFERENCES poems(id) ON DELETE CASCADE,
  word text NOT NULL,
  translation text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(poem_id, word)
);

-- Enable RLS
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to poems"
  ON poems
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to translations"
  ON translations
  FOR SELECT
  TO public
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_poems_updated_at
  BEFORE UPDATE ON poems
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();