import { BaseHandler } from "@food-stories/common/handlers";
import { LoggerClass } from "@food-stories/common/logger";
import { UpdateMediaUrlsHandler } from "../interface/handlers/UpdateMediaUrls.handler";
import { UpdateMediaUrls } from "../application/usecases/UpdateMediaUrls.usecase";
import { postRepo } from "../interface/db/post.repository";

export function makeUpdateMediaUrlsHandler(Logger: LoggerClass): BaseHandler {
  const uc = new UpdateMediaUrls(postRepo, new Logger('UseCase: UpdateMediaUrls'));
  return new UpdateMediaUrlsHandler(uc);
}