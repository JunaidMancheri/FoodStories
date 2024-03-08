import { BaseHandler } from "@food-stories/common/handlers";
import { GetUsersPostsHandler } from "../interface/handlers/GetUsersPosts.handler";
import { GetUsersPostsUc } from "../application/usecases/GetUsersPosts.usecase";
import { postRepo } from "../interface/db/post.repository";

export function makeGetUsersPostsHandler(): BaseHandler {
  const uc = new GetUsersPostsUc(postRepo);
  return new GetUsersPostsHandler(uc)
}