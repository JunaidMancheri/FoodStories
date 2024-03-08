import { BaseHandler } from "@food-stories/common/handlers";
import { GetCurrentUserDataHandler } from "../interface/rpc/handlers/getCurrentUserData.handler";
import { GetCurrentUserDataUC } from "../application/usecases/getCurrentUserData.usecase";
import { userRepo } from "../interface/db/mongodb/users.repository";
import { LoggerClass } from "@food-stories/common/logger";


export  function makeGetCurrentUserDataHandler(Logger: LoggerClass): BaseHandler {
  const uc = new GetCurrentUserDataUC(userRepo,  new Logger('UseCase: getCurrentUserData'));
   return new GetCurrentUserDataHandler(uc)
}

