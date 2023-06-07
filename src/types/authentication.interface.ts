import { Brgy } from "./brgy.type";
import { UserProfile } from "./user.type";

export type CurrentUserMetaData = Partial<Partial<UserProfile> & {
  brgy: Pick<Brgy, 'name'>
}>