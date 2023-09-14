import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "../interface/rpc/handlers";
import { CreateUserUseCase } from "../application/usecases/CreateUser.usecase";
import { LoggerClass } from "@food-stories/common/logger";
import { UserRepository } from "../interface/db/mongodb/repository/users.repository";
import { userModel } from "../interface/db/mongodb/models/user.model";

const userRepo = new UserRepository(userModel);

export function makeCreateUserHandler(Logger: LoggerClass) : BaseHandler {
  const usecase = new CreateUserUseCase(new Logger('UseCase:Create'), userRepo);
  return  new CreateUserHandler( usecase, new Logger('Handler:Create'));
}