import { IUser } from "../../../entities";

export interface IUserCreatedEventPublisher {
  publish(user: Pick<IUser, 'id' | 'username'>):Promise<void>;
}