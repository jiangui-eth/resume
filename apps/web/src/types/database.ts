// Minimal Supabase Database type covering the faq_chunks table and
// hybrid_search RPC — mirrors supabase/schema.sql exactly.
// If the schema changes, update both this file and the SQL together.
export interface Database {
  public: {
    Tables: {
      faq_chunks: {
        Row: {
          id: string
          faq_id: string
          category: string
          question: string
          answer: string
          content: string
          embedding: string | null
          fts_vector: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          faq_id: string
          category: string
          question: string
          answer: string
          content: string
          embedding?: string | null
          fts_vector?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          faq_id?: string
          category?: string
          question?: string
          answer?: string
          content?: string
          embedding?: string | null
          fts_vector?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      hybrid_search: {
        Args: {
          // pgvector passed as a bracketed string: "[0.1,0.2,...]"
          query_embedding: string
          query_text: string
          match_count?: number
        }
        Returns: Array<{
          id: string
          faq_id: string
          category: string
          question: string
          answer: string
          content: string
          vector_score: number
          bm25_score: number
          hybrid_score: number
        }>
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
