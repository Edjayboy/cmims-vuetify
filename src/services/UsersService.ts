import { db } from './base/Db'
import { GetTotalUserInventoryRequest, UserAuthentication, UserInventoryRequest, UserInventoryRequestAdd, UserInventoryRequestFilter, UserProfile, UserProfileAddDto, UserProfileUpdateDto } from '@/types/user.type'
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

export const getUserByUuid = async (uuid: string | undefined): Promise<Partial<UserProfile>> => {
  if (!uuid)
    return {}

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
  ).eq('user_id', uuid).returns<UserProfile>().single()

  if (error) {
    console.log(error)
    return {}
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

export const updateUser = async (user: UserProfileUpdateDto): Promise<void> => {
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

export const getUserInventoryRequests = async (filter: UserInventoryRequestFilter = {}): Promise<UserInventoryRequest[]> => {
  const selectQuery = `
    id,
    isRead,
    notes,
    quantity,
    acknowledgedById,
    itemId,
    requestedById,
    requestedBy:requestedById (
      full_name
    ),
    brgy (
      name
    ),
    acknowledgedBy:acknowledgedById (
      full_name
    ),
    item:items (
      name,
      brand:brands (
        name
      ),
      expirationDate,
      dateManufactured,
      units,
      quantity
    )
  `
  if (filter.brgyId) {
    const { data, error } = await db.userInventoryRequests().select(selectQuery).eq('brgyId', filter.brgyId).returns<UserInventoryRequest[]>()

    if (error) {
      console.log(error)
      return []
    }

    return data
  }

  const { data, error } = await db.userInventoryRequests().select(selectQuery).returns<UserInventoryRequest[]>()

  if (error) {
    console.log(error)
    return []
  }

  return data
}

export const addUserInventoryRequest = async (userInventoryRequest: UserInventoryRequestAdd) => {
  try {
    const { error } = await db.userInventoryRequests().insert(userInventoryRequest)
    if (error)
      throw error
  } catch (err) {
    console.log(err)
  }
}

export const updateUserInventoryRequest = async (userInventoryRequest: Partial<UserInventoryRequest>) => {
  try {
    if (!userInventoryRequest.id)
      throw 'Update: No Id specified'

    const { error } = await db.userInventoryRequests().update(userInventoryRequest).eq('id', userInventoryRequest.id)
    if (error)
      throw error
  } catch (err) {
    console.log(err)
  }
}

export const getTotalUserInventoryRequest = async (filter?: UserInventoryRequestFilter): Promise<GetTotalUserInventoryRequest> => {
  if (filter?.brgyId) {
    const { data, error } = await supabaseClient().rpc('get_total_user_inventory_requests_per_brgy', { brgy_id: filter?.brgyId })

    if (error)
      console.log(error)

    return data
  }


  const { data, error } = await supabaseClient().rpc('get_total_user_inventory_requests')
  if (error)
    console.log(error)

  console.log(data[0])
  return data
}