import { supabaseClient } from "./base/SupabaseService"

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export const getUserSession = async () => {
  return await supabaseClient().auth.getSession()
}

export const signOut = async () => {
  const { error } = await supabaseClient().auth.signOut()

  if (error) {
    console.log(error)
  }
}