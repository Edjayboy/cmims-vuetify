import { IBrgy } from "./brgy.interface";

export default {}

type UserType = 'admin' | 'user'
export interface IUser {
  name: string;
  brgy?: IBrgy;
  userType: UserType
  password?: string;
  email: string;
  phoneNumber?: number;
}
