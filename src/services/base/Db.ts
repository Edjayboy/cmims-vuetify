import { supabaseClient } from './SupabaseService';

export const db = {
  userProfiles: () => supabaseClient().from('user_profiles'),
  brgys: () => supabaseClient().from('brgy'),
  brands: () => supabaseClient().from('brands'),
  items: () => supabaseClient().from('items'),
  userInventoryRequests: () => supabaseClient().from('user_inventory_requests')
};