import { IUser } from "../../../entities";

export interface IUserCreatedEventPublisher {
  publish(user: IUser):Promise<void>;
}