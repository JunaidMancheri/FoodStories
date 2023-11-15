import { makeUserEntity, Profile, UserProps, IUser } from "./User.entity";
import { Logger } from '@food-stories/users-srv/core'

const User = makeUserEntity(new Logger('Enitity:User'))

export { User ,UserProps, Profile, IUser}
