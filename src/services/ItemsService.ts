import { Item, ItemAdd } from '@/types/item.interface'
import { db } from './base/Db'

export const getItems = async (): Promise<Item[]> => {
  const { data, error } = await db.items().select(`
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
    )
  `).returns<Item[]>()

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