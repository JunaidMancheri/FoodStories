import { BaseHandler } from "@food-stories/common/handlers";
import { ILogger, LoggerClass } from "@food-stories/common/logger";
import { isUsernameAvailableHandler } from "../interface/rpc/handlers";
import { isUsernameAvailableUseCase } from "../application/usecases/isUsernameAvailable.usecase";
import { userRepo } from "./createUser.factory";

export function makeIsUsernameAvailableHandler(Logger: LoggerClass): BaseHandler {
  const uc = new isUsernameAvailableUseCase(userRepo);
  return new isUsernameAvailableHandler(uc, new Logger('isUsernameAvailable') );
}