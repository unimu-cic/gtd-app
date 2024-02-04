import {Item} from "@/store";

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: Item
        Insert: Item
        Update: Item
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
