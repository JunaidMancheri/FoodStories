import { IUser } from "../../../entities";

export interface IUserCreatedEventPublisher {
  publish(user: Pick<IUser, 'id' | 'username' | 'DPURL'>):Promise<void>;
}