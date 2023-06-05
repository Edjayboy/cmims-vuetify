import { IUpdateUser, IUser, IUserDto } from '@/interfaces/user.interface'
import { supabase, supabaseAdmin } from './base/SupabaseService'
import { ISupabaseResponse } from '@/interfaces/supabase.interface'

export const getUsers = async (): Promise<ISupabaseResponse<IUser[]>> => {
  return supabase()
    .from('user_profiles')
    .select(`
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
        )
      `)
}

export const addUser = async (user: IUserDto) => {
  try {
    const { email, password = '' } = user
    await supabase().auth.signUp({
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

export const updateUser = async (user: IUserDto): Promise<IUpdateUser> => {
  const { password, email, user_id, full_name, brgy_id, role, phone_number } = user

  try {
    // leave the password blank
    if (password) {
      await supabase().auth.updateUser({ password })
    }

    const userProfile = {
      full_name,
      brgy_id,
      role,
      email,
      phone_number
    }

    const { data } = await supabase().from('user_profiles').update(userProfile).eq('user_id', user_id)

    return {
      data,
      error: null
    }
  } catch (err) {
    console.log(err)
    return {
      data: null,
      error: err
    }
  }

}