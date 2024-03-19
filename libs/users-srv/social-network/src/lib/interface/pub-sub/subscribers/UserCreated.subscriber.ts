import { BaseSubscriber } from "@food-stories/common/handlers";
import { EVENTS } from '@food-stories/common/events';
import { IUser } from "@food-stories/common/typings";

export class UserCreatedEventSubscriber extends BaseSubscriber {
  event = EVENTS.User.Created.v1;
  async execute(payload: IUser): Promise<void> {
    console.log(payload);
  }
  
}