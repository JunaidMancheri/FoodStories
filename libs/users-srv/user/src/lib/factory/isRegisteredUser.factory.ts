import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { IsRegisteredUserHandler } from "../interface/rpc/handlers/isRegisteredUser.handler";
import { IsRegisteredUserUsecase } from "../application/usecases/isRegisteredUser.usecase";
import { userRepo } from "./createUser.factory";

export function makeIsRegisteredUser(Logger: LoggerClass): BaseHandler {
  const uc = new IsRegisteredUserUsecase(userRepo);
  return new IsRegisteredUserHandler(uc, new Logger('IsRegisteredUser'));
}