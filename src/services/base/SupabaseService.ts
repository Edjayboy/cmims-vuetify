import { createClient } from "@supabase/supabase-js";

const supabaseUrlDefault = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKeyDefault = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface ISupabaseParams {
  supabaseUrl?: string;
  supabaseAnonKey?: string
}
export const supabaseClient = (supabaseParams?: ISupabaseParams) => {
  const supabaseUrl = supabaseParams?.supabaseUrl || supabaseUrlDefault
  const supabaseAnonKey = supabaseParams?.supabaseAnonKey || supabaseAnonKeyDefault

  return createClient(supabaseUrl, supabaseAnonKey)
};

export const supabaseAdmin = (supabaseParams?: ISupabaseParams) => {
  const supabaseUrl = supabaseParams?.supabaseUrl || supabaseUrlDefault
  const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
};
