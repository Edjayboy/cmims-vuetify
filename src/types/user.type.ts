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

export type UserInventoryRequest = definitions['user_inventory_requests'] & Pick<UserProfile, 'full_name' | 'email' | 'brgy_id'> & Pick<Brgy, 'name'> & {
  acknowledgedBy: UserProfile,
  requestedBy: UserProfile
  items: ItemWithBrand
}

export type UserInventoryRequestAdd = Pick<UserInventoryRequest, 'notes' | 'quantity' | 'requestedById' | 'itemId'>