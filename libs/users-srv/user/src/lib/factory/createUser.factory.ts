import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "../interface/rpc/handlers";
import { CreateUserUseCase } from "../application/usecases/CreateUser.usecase";
import { LoggerClass } from "@food-stories/common/logger";
import { userRepo }  from '../interface/db/mongodb/users.repository';




export function makeCreateUserHandler(Logger: LoggerClass) : BaseHandler {
  const usecase = new CreateUserUseCase(new Logger('UseCase:Create'), userRepo);
  return  new CreateUserHandler( usecase);
}