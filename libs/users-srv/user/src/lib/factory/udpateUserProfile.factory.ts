import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { UpdateUserProfileHandler } from "../interface/rpc/handlers/updateUserProfile.handler";
import { UpdateUserProfileUC } from "../application/usecases/updateUserProfile.usecase";
import { userRepo } from "../interface/db/mongodb/users.repository";

export function makeUpdateUserProfileHandler(Logger: LoggerClass) : BaseHandler  {
  const uc = new UpdateUserProfileUC(userRepo, new Logger('Usecase: UpdateUserProfile'))
  return new UpdateUserProfileHandler(uc);
}