import { IPost, Post, PostProps } from "../../entities";
import { IPostDoc } from "./post.model";

export function mapDocumentToPostEntity(document: IPostDoc | null): IPost | null {
  if (!document) return null;
  const postProps: PostProps = {
    userId: document.userId,
    caption: document.caption,
    commentsCount: document.commentsCount,
    likesCount: document.likesCount,
    createdAt: document.createdAt,
    id: document._id,
    mediaUrls : document.mediaUrls,
    thumbnailUrl: document.thumbnailUrl,
  }
  return new Post(postProps);
}


export function mapDocumentsToArrayOfPostEntities(documents: IPostDoc[]): IPost[] {
  if (!documents.length) return [];
  return documents.map((doc) => mapDocumentToPostEntity(doc));
}