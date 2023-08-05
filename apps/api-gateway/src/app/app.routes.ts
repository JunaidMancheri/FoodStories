import { ApiGatewayAuthModule } from "@food-stories/api-gateway/auth";
import { Routes } from "@nestjs/core";

export const appRoutes: Routes = [
  {
    path: 'auth',
    module: ApiGatewayAuthModule,
  }
]