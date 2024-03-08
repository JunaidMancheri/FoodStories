import { IComment } from "@food-stories/common/typings";
import { ICommentDoc } from "./comment.model";

export  function mapDocumentToCommmentEntity(doc: ICommentDoc) : IComment {
  return {
    id : doc.id,
    postId: doc.postId,
    userId: doc.userId,
    comment: doc.comment,
    createdAt: doc.createdAt,
    likesCount: doc.likesCount,
    repliesCount : doc.repliesCount,
  }
}


export function mapDocumentsToCommentEntities(docs: ICommentDoc[]): IComment[] {
  return docs.map(doc => mapDocumentToCommmentEntity(doc));
}