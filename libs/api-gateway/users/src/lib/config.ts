export interface IUsersAppConfig {
  users_package_name: string;
  service_name: string;
}

export const  UsersAppConfig: IUsersAppConfig = {
  users_package_name: 'users_service.v1',
  service_name: 'UsersService',
}