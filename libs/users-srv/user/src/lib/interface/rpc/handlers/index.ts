import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "./CreateUser.handler";
import { makeLogger } from "@food-stories/common/logger";

const logger = makeLogger('users');

export function makeCreateUserHandler(): BaseHandler {
  return new CreateUserHandler(new logger('create-user'));
}