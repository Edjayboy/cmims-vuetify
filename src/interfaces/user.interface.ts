import { IBrgy } from "./brgy.interface";

export default {}

type UserRole = 'admin' | 'user'
export interface IUser {
  name: string;
  brgy?: IBrgy;
  role: UserRole
  password?: string;
  email: string;
  phoneNumber?: number;
}
