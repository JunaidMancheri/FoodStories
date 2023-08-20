import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "../interface/rpc/handlers";
import { makeLogger } from "@food-stories/common/logger";

const Logger  = makeLogger('user');

export function makeCreateUserHandler() : BaseHandler {
  return  new CreateUserHandler(new Logger('create-user'));
}