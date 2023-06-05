import type { definitions } from './supabase/generated-types';

export type UserProfile = definitions['user_profiles'];
export type UserProfileAdd = Omit<UserProfile, 'id'>
export type UserAuthentication = {
  email: string,
  password: string
}

export type UserProfileAddDto = UserProfileAdd & UserAuthentication
export type UserProfileUpdateDto = Omit<UserProfile, 'id' | 'created_at'>