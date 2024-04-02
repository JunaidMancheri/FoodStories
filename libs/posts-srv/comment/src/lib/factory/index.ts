import { LoggerClass } from "@food-stories/common/logger";
import { Comment, makeCommentEntity } from "../entities/Comment.entity";
import { AddCommentHandler } from "../interface/handlers/AddComment.handler";
import { GetCommentsForAPostHandler } from "../interface/handlers/GetCommentsForAPost.handler";
import { Producer } from "kafkajs";

function makeAddCommentHandler(Comment: Comment, Logger: LoggerClass, producer: Producer) {
  return new AddCommentHandler(Comment, new Logger('Hanlder: AddComment'), producer);
}

function makeGetCommentsForAPostHandler() {
  return new GetCommentsForAPostHandler();
}

export function initialize(Logger: LoggerClass, producer: Producer) {
  const Comment = makeCommentEntity(new Logger('Entity: Comment'));

  return {
    getRpcHanlders: () => {
      return {
        addComment: makeAddCommentHandler(Comment, Logger, producer),
        getCommentsForAPost: makeGetCommentsForAPostHandler(),
      }
    }
  }

}