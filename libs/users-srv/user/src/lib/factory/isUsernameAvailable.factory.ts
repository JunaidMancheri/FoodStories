import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { isUsernameAvailableHandler } from "../interface/rpc/handlers";
import { isUsernameAvailableUseCase } from "../application/usecases/isUsernameAvailable.usecase";
import { userRepo } from "../interface/db/mongodb/users.repository";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function makeIsUsernameAvailableHandler(Logger: LoggerClass): BaseHandler {
  const uc = new isUsernameAvailableUseCase(userRepo);
  return new isUsernameAvailableHandler(uc);
}