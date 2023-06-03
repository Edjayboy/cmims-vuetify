import { IBrand } from "./brand.interface";

export default {}

export interface IItem {
  id: string | number;
  name: string;
  description?: string;
  brand: IBrand;
  expirationDate: string;
  dateManufactured: string;
  units: string;
  quantity: number
}