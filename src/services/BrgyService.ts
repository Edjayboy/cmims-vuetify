import { Brgy } from '@/types/brgy.type'
import { db } from './base/Db'

export const getBrgys = async (): Promise<Brgy[]> => {
  const { data, error } = await db.brgy().select(`
    id,
    name
  `).returns<Brgy[]>()

  if (error) {
    console.log(error)
    return []
  }

  return data
}