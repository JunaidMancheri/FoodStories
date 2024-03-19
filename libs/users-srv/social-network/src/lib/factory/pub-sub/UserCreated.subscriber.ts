import { UserCreatedEventSubscriber } from "../../interface/pub-sub/subscribers/UserCreated.subscriber";

export  function makeUserCreatedSubscriber() {
  return new UserCreatedEventSubscriber();
}