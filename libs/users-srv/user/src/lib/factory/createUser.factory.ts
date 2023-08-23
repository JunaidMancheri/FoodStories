import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "../interface/rpc/handlers";
import { CreateUserUseCase } from "../application/usecases/CreateUser.usecase";
import { LoggerClass } from "@food-stories/common/logger";

export function makeCreateUserHandler(Logger: LoggerClass) : BaseHandler {
  const usecase = new CreateUserUseCase(new Logger('UseCase:Create'));
  return  new CreateUserHandler( usecase, new Logger('Handler:Create'));
}