import { Brgy } from './brgy.type';
import { ItemWithBrand } from './item.interface';
import type { definitions } from './supabase/generated-types';

export type UserProfile = definitions['user_profiles'];
export type UserProfileAdd = Omit<UserProfile, 'id'>
export type UserAuthentication = {
  email: string,
  password: string
}

export type UserProfileAddDto = UserProfileAdd & UserAuthentication
export type UserProfileUpdateDto = Omit<UserProfile, 'id' | 'created_at'>

export type UserInventoryRequest = definitions['user_inventory_requests'] & {
  acknowledgedBy: UserProfile,
  requestedBy: UserProfile
  item: ItemWithBrand
}

export type UserInventoryRequestAdd = Pick<UserInventoryRequest, 'notes' | 'quantity' | 'requestedById' | 'itemId'>

export type UserInventoryRequestFilter = {
  brgyId?: number | undefined
}

export type GetTotalUserInventoryRequest = {
  total_user_inventory_requests: number
}