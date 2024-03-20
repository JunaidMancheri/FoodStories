import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { CreatePostHandler } from "../interface/handlers/CreatePost.handler";
import { CreatePostUC } from "../application/usecases/CreatePost.usecase";
import { postRepo } from "../interface/db/post.repository";
import { Producer } from "kafkajs";

export function makeCreatePostHandler(Logger: LoggerClass, producer: Producer): BaseHandler {
  const uc = new CreatePostUC(postRepo, new Logger('UseCase: CreatePost'), producer)
  return new CreatePostHandler(uc);
}