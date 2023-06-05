import { db } from './base/Db'
import { UserAuthentication, UserProfile, UserProfileAddDto, UserProfileUpdateDto } from '@/types/user.type'
import { supabaseAdmin, supabaseClient } from './base/SupabaseService'

export const getUsers = async (): Promise<UserProfile[]> => {
  const { data, error } = await db.userProfiles().select(`
    id,
    full_name,
    role,
    email,
    brgy_id,
    phone_number,
    user_id,
    brgy (
      id,
      name
    )`
  ).returns<UserProfile[]>()

  if (error) {
    console.log(error)
    return []
  }

  return data
}

export const addUser = async (user: UserProfileAddDto) => {
  try {
    const { email, password } = user
    await supabaseClient().auth.signUp({
      email,
      password,
      options: {
        data: {
          ...user
        }
      }
    })
    return
  } catch (err) {
    return err
  }
}

export const updateUser = async (user: UserProfileUpdateDto & UserAuthentication): Promise<void> => {
  const { password, user_id, full_name, brgy_id, role, phone_number, email } = user

  try {
    // leave the password blank
    if (password) {
      await supabaseClient().auth.updateUser({ password })
    }

    const updateUserData: Omit<UserProfileUpdateDto, 'user_id'> = {
      full_name,
      brgy_id,
      role,
      phone_number,
      email
    }
    const { error } = await db.userProfiles().update(updateUserData).eq('user_id', user_id)

    if (error)
      throw error

  } catch (err) {
    console.log(err)
  }
}

export const deleteUser = async (user_id: string) => {
  if (!user_id)
    return

  // Todo: this should be in backend not frontend
  await supabaseAdmin().auth.admin.deleteUser(user_id)
}