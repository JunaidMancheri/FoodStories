import { LoggerClass } from "@food-stories/common/logger";
import { Comment, makeCommentEntity } from "../entities/Comment.entity";
import { AddCommentHandler } from "../interface/handlers/AddComment.handler";
import { GetCommentsForAPostHandler } from "../interface/handlers/GetCommentsForAPost.handler";

function makeAddCommentHandler(Comment: Comment, Logger: LoggerClass) {
  return new AddCommentHandler(Comment, new Logger('Hanlder: AddComment'));
}

function makeGetCommentsForAPostHandler() {
  return new GetCommentsForAPostHandler();
}

export function initialize(Logger: LoggerClass) {
  const Comment = makeCommentEntity(new Logger('Entity: Comment'));

  return {
    getRpcHanlders: () => {
      return {
        addComment: makeAddCommentHandler(Comment, Logger),
        getCommentsForAPost: makeGetCommentsForAPostHandler(),
      }
    }
  }

}