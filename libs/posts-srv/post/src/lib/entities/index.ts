import { Logger } from "@food-stories/posts-srv/core";
import { makePostEntity } from "./Post.entity";
import { IPost } from "@food-stories/common/typings";
import { PostProps } from "./Post.entity";

const Post = makePostEntity(new Logger('Entity: Post'));

export { Post, PostProps, IPost}