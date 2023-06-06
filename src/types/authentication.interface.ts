import { UserProfile } from "./user.type";

export type CurrentUser = Omit<UserProfile, 'created_at' | 'id'>