import { BaseHandler } from "@food-stories/common/handlers";
import { CreateUserHandler } from "../interface/rpc/handlers";
import { CreateUserUseCase } from "../application/usecases/CreateUser.usecase";
import { LoggerClass } from "@food-stories/common/logger";
import { userRepo }  from '../interface/db/mongodb/users.repository';
import { UserCreatedEventPublisher } from "../infra/pub-sub/publishers/UserCreated.publisher";
import { Producer } from "kafkajs";




export function makeCreateUserHandler(Logger: LoggerClass, producer: Producer) : BaseHandler {
  const  publisher = new UserCreatedEventPublisher(producer)
  const usecase = new CreateUserUseCase(new Logger('UseCase:Create'), userRepo, publisher);
  return  new CreateUserHandler( usecase);
}
