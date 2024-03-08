export interface IPostsAppConfig {
  posts_package_name: string;
  service_name: string;
}

export const  PostsAppConfig: IPostsAppConfig = {
  posts_package_name: 'posts_service.v1',
  service_name: 'PostsService',
}