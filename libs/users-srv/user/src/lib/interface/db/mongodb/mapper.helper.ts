import { IUser, User, UserProps } from "../../../entities";
import { IUserDoc } from "./models/user.model";

export function mapDocumentToUserEntity(document: IUserDoc | null): IUser | null {
  if (!document) return null;
  const userProps: UserProps = {
    id: document._id,
    email: document.email,
    username: document.username,
    createdAt: document.createdAt,
    DPURL: document.DPURL,
    followersCount: document.followersCount,
    followingsCount: document.followingsCount,
    isPrivate: document.isPrivate,
    name: document.name,
    postsCount: document.postsCount,
    profile: document.profile,
  }
  return new User(userProps);
}

export function mapDocumentsToUserEntities(docs: IUserDoc[]): IUser[] {
  return docs.map(doc => mapDocumentToUserEntity(doc)) as IUser[];
}