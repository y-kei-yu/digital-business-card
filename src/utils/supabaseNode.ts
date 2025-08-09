import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

//バッチ専用のSupabaseクライアントを作成
export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);
