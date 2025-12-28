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
      ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string
          data_sources: Json | null
          description: string
          expires_at: string | null
          id: string
          insight_type: string
          recommendations: Json | null
          timeframe: string | null
          title: string
          user_id: string
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          data_sources?: Json | null
          description: string
          expires_at?: string | null
          id?: string
          insight_type: string
          recommendations?: Json | null
          timeframe?: string | null
          title: string
          user_id: string
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          data_sources?: Json | null
          description?: string
          expires_at?: string | null
          id?: string
          insight_type?: string
          recommendations?: Json | null
          timeframe?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      biometric_streams: {
        Row: {
          created_at: string
          device_id: string | null
          id: string
          recorded_at: string
          stream_type: string
          user_id: string
          value: Json
        }
        Insert: {
          created_at?: string
          device_id?: string | null
          id?: string
          recorded_at: string
          stream_type: string
          user_id: string
          value: Json
        }
        Update: {
          created_at?: string
          device_id?: string | null
          id?: string
          recorded_at?: string
          stream_type?: string
          user_id?: string
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "biometric_streams_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "connected_devices"
            referencedColumns: ["id"]
          },
        ]
      }
      connected_devices: {
        Row: {
          battery_level: number | null
          connection_status: string
          created_at: string
          device_name: string
          device_type: string
          id: string
          last_sync_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          battery_level?: number | null
          connection_status?: string
          created_at?: string
          device_name: string
          device_type: string
          id?: string
          last_sync_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          battery_level?: number | null
          connection_status?: string
          created_at?: string
          device_name?: string
          device_type?: string
          id?: string
          last_sync_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      device_tokens: {
        Row: {
          access_token: string
          created_at: string
          device_type: string
          id: string
          refresh_token: string | null
          token_expires_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          device_type: string
          id?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          device_type?: string
          id?: string
          refresh_token?: string | null
          token_expires_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      health_forecasts: {
        Row: {
          created_at: string
          energy_prediction: Json | null
          forecast_date: string
          id: string
          intervention_timing: Json | null
          optimal_training_window: string | null
          recovery_prediction: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          energy_prediction?: Json | null
          forecast_date: string
          id?: string
          intervention_timing?: Json | null
          optimal_training_window?: string | null
          recovery_prediction?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          energy_prediction?: Json | null
          forecast_date?: string
          id?: string
          intervention_timing?: Json | null
          optimal_training_window?: string | null
          recovery_prediction?: number | null
          user_id?: string
        }
        Relationships: []
      }
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
      nova_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          role: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      nova_usage: {
        Row: {
          created_at: string
          feature_type: string
          id: string
          messages_count: number | null
          organisation_id: string | null
          session_ended_at: string | null
          session_started_at: string
          tokens_used: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          feature_type?: string
          id?: string
          messages_count?: number | null
          organisation_id?: string | null
          session_ended_at?: string | null
          session_started_at?: string
          tokens_used?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          feature_type?: string
          id?: string
          messages_count?: number | null
          organisation_id?: string | null
          session_ended_at?: string | null
          session_started_at?: string
          tokens_used?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nova_usage_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
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
      organisation_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          email: string
          expires_at: string
          id: string
          invited_by: string
          organisation_id: string
          role: Database["public"]["Enums"]["org_role"]
          status: Database["public"]["Enums"]["invite_status"]
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          organisation_id: string
          role?: Database["public"]["Enums"]["org_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          organisation_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          status?: Database["public"]["Enums"]["invite_status"]
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_invites_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_join_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          organisation_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["join_request_status"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          organisation_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["join_request_status"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          organisation_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["join_request_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_join_requests_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_member_analytics: {
        Row: {
          check_ins_count: number | null
          id: string
          last_active_at: string | null
          organisation_id: string
          protocols_completed: number | null
          total_session_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          check_ins_count?: number | null
          id?: string
          last_active_at?: string | null
          organisation_id: string
          protocols_completed?: number | null
          total_session_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          check_ins_count?: number | null
          id?: string
          last_active_at?: string | null
          organisation_id?: string
          protocols_completed?: number | null
          total_session_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_member_analytics_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisation_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string
          organisation_id: string
          role: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string
          organisation_id: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id: string
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string
          organisation_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organisation_members_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          billing_cycle: string | null
          billing_email: string | null
          created_at: string
          domain: string | null
          domain_verified: boolean | null
          id: string
          logo_url: string | null
          name: string
          price_per_seat: number | null
          seat_limit: number | null
          seats_used: number | null
          slug: string
          subscription_status: string | null
          updated_at: string
        }
        Insert: {
          billing_cycle?: string | null
          billing_email?: string | null
          created_at?: string
          domain?: string | null
          domain_verified?: boolean | null
          id?: string
          logo_url?: string | null
          name: string
          price_per_seat?: number | null
          seat_limit?: number | null
          seats_used?: number | null
          slug: string
          subscription_status?: string | null
          updated_at?: string
        }
        Update: {
          billing_cycle?: string | null
          billing_email?: string | null
          created_at?: string
          domain?: string | null
          domain_verified?: boolean | null
          id?: string
          logo_url?: string | null
          name?: string
          price_per_seat?: number | null
          seat_limit?: number | null
          seats_used?: number | null
          slug?: string
          subscription_status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      performance_goals: {
        Row: {
          created_at: string
          current_value: number | null
          goal_type: string
          id: string
          progress_percentage: number | null
          started_at: string
          status: string | null
          target_date: string | null
          target_value: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_value?: number | null
          goal_type: string
          id?: string
          progress_percentage?: number | null
          started_at?: string
          status?: string | null
          target_date?: string | null
          target_value: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_value?: number | null
          goal_type?: string
          id?: string
          progress_percentage?: number | null
          started_at?: string
          status?: string | null
          target_date?: string | null
          target_value?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      protocol_adjustments: {
        Row: {
          adjustment_type: string
          biometric_trigger: Json | null
          created_at: string
          id: string
          new_state: Json | null
          previous_state: Json | null
          protocol_id: string | null
          reason: string | null
          user_id: string
        }
        Insert: {
          adjustment_type: string
          biometric_trigger?: Json | null
          created_at?: string
          id?: string
          new_state?: Json | null
          previous_state?: Json | null
          protocol_id?: string | null
          reason?: string | null
          user_id: string
        }
        Update: {
          adjustment_type?: string
          biometric_trigger?: Json | null
          created_at?: string
          id?: string
          new_state?: Json | null
          previous_state?: Json | null
          protocol_id?: string | null
          reason?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocol_adjustments_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "user_protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      protocol_assessments: {
        Row: {
          assessment_data: Json
          completed_at: string
          created_at: string
          goals: string[]
          id: string
          lifestyle_factors: Json | null
          user_id: string
        }
        Insert: {
          assessment_data: Json
          completed_at?: string
          created_at?: string
          goals: string[]
          id?: string
          lifestyle_factors?: Json | null
          user_id: string
        }
        Update: {
          assessment_data?: Json
          completed_at?: string
          created_at?: string
          goals?: string[]
          id?: string
          lifestyle_factors?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      protocol_check_ins: {
        Row: {
          check_in_date: string
          created_at: string
          energy_score: number | null
          id: string
          mood_score: number | null
          notes: string | null
          products_completed: Json
          protocol_id: string | null
          user_id: string
        }
        Insert: {
          check_in_date?: string
          created_at?: string
          energy_score?: number | null
          id?: string
          mood_score?: number | null
          notes?: string | null
          products_completed?: Json
          protocol_id?: string | null
          user_id: string
        }
        Update: {
          check_in_date?: string
          created_at?: string
          energy_score?: number | null
          id?: string
          mood_score?: number | null
          notes?: string | null
          products_completed?: Json
          protocol_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocol_check_ins_protocol_id_fkey"
            columns: ["protocol_id"]
            isOneToOne: false
            referencedRelation: "user_protocols"
            referencedColumns: ["id"]
          },
        ]
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          p256dh_key: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh_key: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh_key?: string
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
      subscriptions: {
        Row: {
          created_at: string
          currency: string
          frequency: string
          id: string
          next_delivery_date: string
          price: number
          product_id: string
          product_title: string
          status: string
          updated_at: string
          user_id: string
          variant_id: string
          variant_title: string | null
        }
        Insert: {
          created_at?: string
          currency?: string
          frequency: string
          id?: string
          next_delivery_date: string
          price: number
          product_id: string
          product_title: string
          status?: string
          updated_at?: string
          user_id: string
          variant_id: string
          variant_title?: string | null
        }
        Update: {
          created_at?: string
          currency?: string
          frequency?: string
          id?: string
          next_delivery_date?: string
          price?: number
          product_id?: string
          product_title?: string
          status?: string
          updated_at?: string
          user_id?: string
          variant_id?: string
          variant_title?: string | null
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
      user_metrics: {
        Row: {
          created_at: string
          device_source: string | null
          id: string
          metadata: Json | null
          metric_type: string
          recorded_at: string
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          device_source?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          recorded_at?: string
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          device_source?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          recorded_at?: string
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      user_protocols: {
        Row: {
          completion_percentage: number
          created_at: string
          goal: string
          id: string
          products: Json
          protocol_name: string
          started_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completion_percentage?: number
          created_at?: string
          goal: string
          id?: string
          products: Json
          protocol_name: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completion_percentage?: number
          created_at?: string
          goal?: string
          id?: string
          products?: Json
          protocol_name?: string
          started_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_points_balance: { Args: { p_user_id: string }; Returns: number }
      is_org_admin: {
        Args: { org_id: string; user_uuid: string }
        Returns: boolean
      }
      is_org_admin_or_owner: {
        Args: { org_id: string; user_uuid: string }
        Returns: boolean
      }
      is_org_member: {
        Args: { org_id: string; user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      invite_status: "pending" | "accepted" | "expired" | "revoked"
      join_request_status: "pending" | "approved" | "rejected"
      order_status:
        | "pending"
        | "processing"
        | "shipped"
        | "delivered"
        | "cancelled"
      org_role: "owner" | "admin" | "member"
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
      invite_status: ["pending", "accepted", "expired", "revoked"],
      join_request_status: ["pending", "approved", "rejected"],
      order_status: [
        "pending",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      org_role: ["owner", "admin", "member"],
    },
  },
} as const
