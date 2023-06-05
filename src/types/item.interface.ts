import { Brand } from './brand.interface';
import type { definitions } from './supabase/generated-types';

export type Item = definitions['items'];

export type ItemWithBrand = Item & Pick<Brand, 'name' | 'id'>
export type ItemAdd = Omit<Item, 'id' | 'created_at'>