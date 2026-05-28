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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      cook_session: {
        Row: {
          current_step: number | null
          id: string
          recipe_id: string | null
          started_at: string | null
          user_id: string | null
        }
        Insert: {
          current_step?: number | null
          id?: string
          recipe_id?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Update: {
          current_step?: number | null
          id?: string
          recipe_id?: string | null
          started_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cuisines: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      diets: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      grocery_item_recipes: {
        Row: {
          created_at: string
          grocery_item_id: string
          recipe_id: string
        }
        Insert: {
          created_at?: string
          grocery_item_id: string
          recipe_id: string
        }
        Update: {
          created_at?: string
          grocery_item_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grocery_item_recipes_grocery_item_id_fkey"
            columns: ["grocery_item_id"]
            isOneToOne: false
            referencedRelation: "grocery_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "grocery_item_recipes_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      grocery_items: {
        Row: {
          added_from: string
          created_at: string
          id: string
          ingredient_id: string
          is_completed: boolean
          quantity: number
          unit: Database["public"]["Enums"]["unit_enum"]
          updated_at: string
          user_id: string
        }
        Insert: {
          added_from?: string
          created_at?: string
          id?: string
          ingredient_id: string
          is_completed?: boolean
          quantity?: number
          unit?: Database["public"]["Enums"]["unit_enum"]
          updated_at?: string
          user_id: string
        }
        Update: {
          added_from?: string
          created_at?: string
          id?: string
          ingredient_id?: string
          is_completed?: boolean
          quantity?: number
          unit?: Database["public"]["Enums"]["unit_enum"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "grocery_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredient_categories: {
        Row: {
          created_at: string | null
          emoji: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          emoji?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      ingredient_substitutes: {
        Row: {
          created_at: string
          id: string
          note: string | null
          original_ingredient_id: string
          substitute_ingredient_id: string
          swap_category: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          original_ingredient_id: string
          substitute_ingredient_id: string
          swap_category?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          original_ingredient_id?: string
          substitute_ingredient_id?: string
          swap_category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_substitutes_original_ingredient_id_fkey"
            columns: ["original_ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_substitutes_substitute_ingredient_id_fkey"
            columns: ["substitute_ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_staple: boolean | null
          local_names: string[] | null
          name: string
          normalized_name: string
          shelf_life_days: number | null
          storage_tip: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_staple?: boolean | null
          local_names?: string[] | null
          name: string
          normalized_name: string
          shelf_life_days?: number | null
          storage_tip?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_staple?: boolean | null
          local_names?: string[] | null
          name?: string
          normalized_name?: string
          shelf_life_days?: number | null
          storage_tip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ingredient_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_slots: {
        Row: {
          created_at: string
          id: string
          meal_type: Database["public"]["Enums"]["meal_type_enum"]
          recipe_id: string | null
          slot_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          meal_type: Database["public"]["Enums"]["meal_type_enum"]
          recipe_id?: string | null
          slot_date: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          meal_type?: Database["public"]["Enums"]["meal_type_enum"]
          recipe_id?: string | null
          slot_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_slots_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      pantry_items: {
        Row: {
          created_at: string | null
          expiration_date: string | null
          id: string
          ingredient_id: string | null
          quantity: number | null
          unit: Database["public"]["Enums"]["unit_enum"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          unit?: Database["public"]["Enums"]["unit_enum"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expiration_date?: string | null
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          unit?: Database["public"]["Enums"]["unit_enum"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pantry_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          onboarded: boolean
          socials: string[] | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          onboarded?: boolean
          socials?: string[] | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          onboarded?: boolean
          socials?: string[] | null
        }
        Relationships: []
      }
      recipe_cuisines: {
        Row: {
          cuisine_id: string | null
          id: string
          recipe_id: string | null
        }
        Insert: {
          cuisine_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Update: {
          cuisine_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_cuisines_cuisine_id_fkey"
            columns: ["cuisine_id"]
            isOneToOne: false
            referencedRelation: "cuisines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_cuisines_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_diets: {
        Row: {
          diet_id: string | null
          id: string
          recipe_id: string | null
        }
        Insert: {
          diet_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Update: {
          diet_id?: string | null
          id?: string
          recipe_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_diets_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_diets_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          id: string
          ingredient_id: string | null
          note: string | null
          quantity: number | null
          recipe_id: string | null
          unit: Database["public"]["Enums"]["unit_enum"] | null
        }
        Insert: {
          id?: string
          ingredient_id?: string | null
          note?: string | null
          quantity?: number | null
          recipe_id?: string | null
          unit?: Database["public"]["Enums"]["unit_enum"] | null
        }
        Update: {
          id?: string
          ingredient_id?: string | null
          note?: string | null
          quantity?: number | null
          recipe_id?: string | null
          unit?: Database["public"]["Enums"]["unit_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_nutrition: {
        Row: {
          calories: number | null
          carbs: number | null
          fat: number | null
          protein: number | null
          recipe_id: string
        }
        Insert: {
          calories?: number | null
          carbs?: number | null
          fat?: number | null
          protein?: number | null
          recipe_id: string
        }
        Update: {
          calories?: number | null
          carbs?: number | null
          fat?: number | null
          protein?: number | null
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_nutrition_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: true
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ratings: {
        Row: {
          created_at: string | null
          id: string
          rating: number | null
          recipe_id: string | null
          review: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          review?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          rating?: number | null
          recipe_id?: string | null
          review?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ratings_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_stats: {
        Row: {
          favorites_count: number | null
          rating_avg: number | null
          rating_count: number | null
          recipe_id: string
          views_count: number | null
        }
        Insert: {
          favorites_count?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          recipe_id: string
          views_count?: number | null
        }
        Update: {
          favorites_count?: number | null
          rating_avg?: number | null
          rating_count?: number | null
          recipe_id?: string
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_stats_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: true
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_step_ingredients: {
        Row: {
          id: string
          ingredient_id: string | null
          quantity: number | null
          recipe_step_id: string | null
          unit: string | null
        }
        Insert: {
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          recipe_step_id?: string | null
          unit?: string | null
        }
        Update: {
          id?: string
          ingredient_id?: string | null
          quantity?: number | null
          recipe_step_id?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_step_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_step_ingredients_recipe_step_id_fkey"
            columns: ["recipe_step_id"]
            isOneToOne: false
            referencedRelation: "recipe_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_steps: {
        Row: {
          auto_start_timer: boolean | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          instruction_description: string | null
          instruction_title: string
          recipe_id: string | null
          step_number: number
        }
        Insert: {
          auto_start_timer?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          instruction_description?: string | null
          instruction_title: string
          recipe_id?: string | null
          step_number: number
        }
        Update: {
          auto_start_timer?: boolean | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          instruction_description?: string | null
          instruction_title?: string
          recipe_id?: string | null
          step_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_steps_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_tags: {
        Row: {
          recipe_id: string
          tag_id: string
        }
        Insert: {
          recipe_id: string
          tag_id: string
        }
        Update: {
          recipe_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_tags_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          author_id: string | null
          cook_time_minutes: number | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_enum"] | null
          id: string
          image_url: string | null
          is_published: boolean | null
          meal_type: Database["public"]["Enums"]["meal_type_enum"] | null
          prep_time_minutes: number | null
          search_vector: unknown
          servings: number | null
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          cook_time_minutes?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_enum"] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          meal_type?: Database["public"]["Enums"]["meal_type_enum"] | null
          prep_time_minutes?: number | null
          search_vector?: unknown
          servings?: number | null
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          cook_time_minutes?: number | null
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_enum"] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          meal_type?: Database["public"]["Enums"]["meal_type_enum"] | null
          prep_time_minutes?: number | null
          search_vector?: unknown
          servings?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_cuisines: {
        Row: {
          created_at: string | null
          cuisine_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          cuisine_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          cuisine_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_cuisines_cuisine_id_fkey"
            columns: ["cuisine_id"]
            isOneToOne: false
            referencedRelation: "cuisines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_cuisines_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_diets: {
        Row: {
          created_at: string | null
          diet_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          diet_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          diet_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_diets_diet_id_fkey"
            columns: ["diet_id"]
            isOneToOne: false
            referencedRelation: "diets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_diets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string | null
          recipe_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          recipe_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          recipe_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_grocery_from_meal_plan: {
        Args: {
          p_end_date: string
          p_only_missing?: boolean
          p_source?: string
          p_start_date: string
        }
        Returns: undefined
      }
      get_current_user_profile_id: { Args: never; Returns: string }
      get_pantry_matches: {
        Args: { p_user_id: string }
        Returns: {
          cook_time_minutes: number
          difficulty: Database["public"]["Enums"]["difficulty_enum"]
          id: string
          image_url: string
          match_percentage: number
          meal_type: Database["public"]["Enums"]["meal_type_enum"]
          prep_time_minutes: number
          servings: number
          slug: string
          title: string
        }[]
      }
      search_recipes: {
        Args: { search_text: string }
        Returns: {
          author_id: string | null
          cook_time_minutes: number | null
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_enum"] | null
          id: string
          image_url: string | null
          is_published: boolean | null
          meal_type: Database["public"]["Enums"]["meal_type_enum"] | null
          prep_time_minutes: number | null
          search_vector: unknown
          servings: number | null
          slug: string
          title: string
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "recipes"
          isOneToOne: false
          isSetofReturn: true
        }
      }
    }
    Enums: {
      difficulty_enum: "easy" | "medium" | "hard"
      meal_type_enum: "breakfast" | "lunch" | "dinner" | "snack" | "dessert"
      unit_enum:
        | "g"
        | "kg"
        | "ml"
        | "l"
        | "tsp"
        | "tbsp"
        | "cup"
        | "piece"
        | "slice"
        | "clove"
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
      difficulty_enum: ["easy", "medium", "hard"],
      meal_type_enum: ["breakfast", "lunch", "dinner", "snack", "dessert"],
      unit_enum: [
        "g",
        "kg",
        "ml",
        "l",
        "tsp",
        "tbsp",
        "cup",
        "piece",
        "slice",
        "clove",
      ],
    },
  },
} as const
