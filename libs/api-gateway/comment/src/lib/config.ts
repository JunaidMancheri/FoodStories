export interface ICommentsAppConfig {
  comments_package_name: string;
  service_name: string;
}

export const  CommentsAppConfig: ICommentsAppConfig = {
  comments_package_name: 'comments_service.v1',
  service_name: 'CommentsService',
}