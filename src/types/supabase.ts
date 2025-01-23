export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      poems: {
        Row: {
          id: string
          external_id: string | null
          title: string
          author: string
          content: string
          year: string | null
          collection: string | null
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          external_id?: string | null
          title: string
          author: string
          content: string
          year?: string | null
          collection?: string | null
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          external_id?: string | null
          title?: string
          author?: string
          content?: string
          year?: string | null
          collection?: string | null
          language?: string
          created_at?: string
          updated_at?: string
        }
      }
      translations: {
        Row: {
          id: string
          poem_id: string
          word: string
          translation: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          poem_id: string
          word: string
          translation: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          poem_id?: string
          word?: string
          translation?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}