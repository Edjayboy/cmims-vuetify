import { IBrgy } from "./brgy.interface";

export default {}

type UserRole = 'admin' | 'user'
export interface IUser {
  id: string | number;
  name: string;
  brgy?: IBrgy;
  role: UserRole
  password?: string;
  email: string;
  phoneNumber?: number | string;
}
