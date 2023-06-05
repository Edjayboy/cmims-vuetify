import { Brand } from './brand.interface';
import type { definitions } from './supabase/generated-types';

export type Item = definitions['items'];
export type BrandItem = definitions['brand_items']

export type ItemWithBrand = Item & Pick<BrandItem, 'quantity'> & {
  brand?: Brand
}