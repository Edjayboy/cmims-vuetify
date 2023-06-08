import { GetTotalItems, Item, ItemAdd, ItemFilter } from '@/types/item.interface'
import { db } from './base/Db'
import { supabaseClient } from './base/SupabaseService'

export const getItems = async (filter: ItemFilter = {}): Promise<Item[]> => {
  const selectQuery = `
    id,
    name,
    description,
    expirationDate,
    dateManufactured,
    units,
    created_at,
    quantity,
    brandId,
    brands (
      name
    ),
    brgyId,
    brgy (
      name
    )
  `
  if (filter.brgyId) {
    const { data, error } = await db.items().select(selectQuery).eq('brgyId', filter.brgyId).returns<Item[]>()
    if (error) {
      console.log(error)
      return []
    }

    return data
  }

  const { data, error } = await db.items().select(selectQuery).returns<Item[]>()
  if (error) {
    console.log(error)
    return []
  }

  return data
}

export const addItem = async (item: ItemAdd) => {
  try {
    const { error } = await db.items().insert(item)
    if (error)
      throw error
  } catch (err) {
    console.log(err)
  }
}

export const updateItem = async (item: Partial<Item>) => {
  try {
    if (!item.id)
      throw 'Update: No Id specified'

    const { error } = await db.items().update(item).eq('id', item.id)
    if (error)
      throw error
  } catch (err) {
    console.log(err)
  }
}

export const deleteItem = async (id: number) => {
  try {
    if (!id)
      throw 'DELETE: No Id specified'

    const { error } = await db.items().delete().eq('id', id)

    if (error)
      throw error

  } catch (err) {
    console.log(err)
  }
}

export const getTotalItems = async (filter: ItemFilter = {}): Promise<GetTotalItems> => {

  if (filter.brgyId) {
    const { data, error } = await supabaseClient()
      .rpc('get_total_items_per_brgy', { brgy_id: filter.brgyId })

    if (error)
      console.log(error)

    return data
  }


  const { data, error } = await supabaseClient()
    .rpc('get_total_items')

  if (error)
    console.log(error)

  return data

}