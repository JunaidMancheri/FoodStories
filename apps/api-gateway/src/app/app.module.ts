import { Module, OnModuleInit } from '@nestjs/common';
import { ApiGatewayAuthModule } from '@food-stories/api-gateway/auth'
import { ConfigModule } from '@nestjs/config'


@Module({
  imports: [ApiGatewayAuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('module init');
    console.log(process.env['AUTH_SERVICE_URI'])
  }
}
