import { ApiGatewayAuthModule } from "@food-stories/api-gateway/auth";
import { ApiGatewayUsersModule } from "@food-stories/api-gateway/users";
import { Routes } from "@nestjs/core";

export const appRoutes: Routes = [
  // {
  //   path: 'auth',
  //   module: ApiGatewayAuthModule,
  // },
  {
    path: 'users',
    module: ApiGatewayUsersModule,
  }

]