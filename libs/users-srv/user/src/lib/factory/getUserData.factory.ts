import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { GetUserDataUC } from "../application/usecases/getUserData.usecase";
import { userRepo } from "../interface/db/mongodb/repository/users.repository";
import { GetUserDataHandler } from "../interface/rpc/handlers/getUserData.handler";

export function makeGetUserDataHandler(Logger: LoggerClass): BaseHandler {
  const uc = new GetUserDataUC(userRepo, new Logger('UseCase: getUserData'))
  return new GetUserDataHandler(uc)
}