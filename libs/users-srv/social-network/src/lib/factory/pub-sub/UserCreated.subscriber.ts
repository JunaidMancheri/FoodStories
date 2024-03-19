import { LoggerClass } from "@food-stories/common/logger";
import { UserCreatedEventSubscriber } from "../../interface/pub-sub/subscribers/UserCreated.subscriber";
import { Driver  } from 'neo4j-driver';

export  function makeUserCreatedSubscriber(Logger: LoggerClass,driver: Driver) {
  return new UserCreatedEventSubscriber(driver, new Logger('Subscriber: UserCreated'));
}