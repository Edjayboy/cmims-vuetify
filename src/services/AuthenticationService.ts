import { supabaseClient } from "./base/SupabaseService"
import { useUserStore } from '@/store/user';

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabaseClient().auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabaseClient().auth.signOut()

  // remove user store state
  const userStore = useUserStore()
  userStore.setAccessToken(undefined)
  userStore.setCurrentUser(undefined)
  userStore.setCurrentUserUuid(undefined)

  if (error) {
    console.log(error)
  }
}