import { makeUserEntity, UserProps } from "./User.entity";
import { Profile,  IUser} from '@food-stories/common/typings'
import { Logger } from '@food-stories/users-srv/core'

const User = makeUserEntity(new Logger('Entity:User'))

export { User ,UserProps, Profile, IUser}
