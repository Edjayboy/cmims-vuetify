import { Brand } from './brand.interface';
import type { definitions } from './supabase/generated-types';

export type Item = definitions['items'];

export type ItemWithBrand = Item & {
  brand: Brand
}
export type ItemAdd = Omit<Item, 'id' | 'created_at'>

export type ItemFilter = {
  brgyId?: number | undefined
}