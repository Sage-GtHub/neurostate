export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      learning_path_lessons: {
        Row: {
          content: string
          created_at: string
          day_number: number
          description: string
          duration_minutes: number
          id: string
          order_index: number
          path_id: string
          resources: Json | null
          title: string
          video_url: string | null
        }
        Insert: {
          content: string
          created_at?: string
          day_number: number
          description: string
          duration_minutes?: number
          id?: string
          order_index?: number
          path_id: string
          resources?: Json | null
          title: string
          video_url?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          day_number?: number
          description?: string
          duration_minutes?: number
          id?: string
          order_index?: number
          path_id?: string
          resources?: Json | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_lessons_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          badge_icon: string
          badge_name: string
          category: string
          created_at: string
          description: string
          difficulty: string
          duration_days: number
          id: string
          image_url: string | null
          is_active: boolean
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          badge_icon: string
          badge_name: string
          category: string
          created_at?: string
          description: string
          difficulty: string
          duration_days: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          badge_icon?: string
          badge_name?: string
          category?: string
          created_at?: string
          description?: string
          difficulty?: string
          duration_days?: number
          id?: string
          image_url?: string | null
          is_active?: boolean
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      loyalty_points: {
        Row: {
          created_at: string
          description: string
          id: string
          order_id: string | null
          points: number
          transaction_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          order_id?: string | null
          points: number
          transaction_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          order_id?: string | null
          points?: number
          transaction_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          order_id: string
          price: number
          product_handle: string | null
          product_id: string
          product_title: string
          quantity: number
          variant_id: string
          variant_title: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          order_id: string
          price: number
          product_handle?: string | null
          product_id: string
          product_title: string
          quantity?: number
          variant_id: string
          variant_title?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          order_id?: string
          price?: number
          product_handle?: string | null
          product_id?: string
          product_title?: string
          quantity?: number
          variant_id?: string
          variant_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          carrier: string | null
          created_at: string
          currency: string
          id: string
          order_number: string
          shipped_at: string | null
          shopify_checkout_url: string | null
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
          tracking_number: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          carrier?: string | null
          created_at?: string
          currency?: string
          id?: string
          order_number: string
          shipped_at?: string | null
          shopify_checkout_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
          tracking_number?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          carrier?: string | null
          created_at?: string
          currency?: string
          id?: string
          order_number?: string
          shipped_at?: string | null
          shopify_checkout_url?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
          tracking_number?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reward_redemptions: {
        Row: {
          expires_at: string | null
          id: string
          points_spent: number
          redeemed_at: string
          redemption_code: string | null
          reward_id: string
          status: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          id?: string
          points_spent: number
          redeemed_at?: string
          redemption_code?: string | null
          reward_id: string
          status?: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          expires_at?: string | null
          id?: string
          points_spent?: number
          redeemed_at?: string
          redemption_code?: string | null
          reward_id?: string
          status?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string
          description: string
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          image_url: string | null
          is_active: boolean
          points_required: number
          product_id: string | null
          reward_type: string
          terms: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          points_required: number
          product_id?: string | null
          reward_type: string
          terms?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          points_required?: number
          product_id?: string | null
          reward_type?: string
          terms?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          earned_at: string
          id: string
          path_id: string
          user_id: string
        }
        Insert: {
          earned_at?: string
          id?: string
          path_id: string
          user_id: string
        }
        Update: {
          earned_at?: string
          id?: string
          path_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      user_learning_progress: {
        Row: {
          completed_at: string
          id: string
          lesson_id: string
          notes: string | null
          path_id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          lesson_id: string
          notes?: string | null
          path_id: string
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          lesson_id?: string
          notes?: string | null
          path_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_learning_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "learning_path_lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_learning_progress_path_id_fkey"
            columns: ["path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_points_balance: { Args: { p_user_id: string }; Returns: number }
    }
    Enums: {
      order_status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      order_status: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
    },
  },
} as const
