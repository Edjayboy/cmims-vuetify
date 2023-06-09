import { Brand } from '@/types/brand.interface'
import { db } from './base/Db'

export const getBrands = async (): Promise<Brand[]> => {
  const { data, error } = await db.brands().select(`
    id,
    name
  `).returns<Brand[]>()

  if (error) {
    console.log(error)
    return []
  }

  return data
}

export const addBrand = async (brand: Pick<Brand, 'name'>) => {
  try {
    const { error } = await db.brands().insert(brand)
    if (error)
      throw error
  } catch (err) {
    console.log(err)
  }
}