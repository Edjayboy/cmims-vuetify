import { IBrgy } from "./brgy.interface";

export default {}

export type UserRole = 'admin' | 'user'
export interface IUser {
  id?: string | number;
  fullName: string;
  brgy_id: number | string;
  brgy?: IBrgy;
  role: UserRole
  password?: string;
  email: string;
  phoneNumber?: number | string;
  user_id?: string
}
export interface IUserDto extends Pick<IUser, 'id' | 'role' | 'email' | 'brgy_id' | 'password' | 'user_id'> {
  full_name: string;
  phone_number?: number | string;
  oldEmail?: string;
}

export interface IUpdateUser {
  data: IUser | unknown | null,
  error: Error | unknown | null
}