import { supabaseClient } from "./base/SupabaseService"

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}