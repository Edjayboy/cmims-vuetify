import { supabaseClient } from './SupabaseService';

export const db = {
  userProfile: () => supabaseClient().from('user_profiles')
};