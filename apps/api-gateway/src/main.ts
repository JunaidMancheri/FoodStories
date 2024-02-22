import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcExceptionFilter } from '@food-stories/api-gateway/common';
import morgan from 'morgan';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  

  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => {
          new Logger('HTTP').log(message.replace('\n', ''));
        },
      },
    })
  );


  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({forbidNonWhitelisted: true}))

  app.useGlobalFilters(new GrpcExceptionFilter());

  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${'api'}`
  );
}

bootstrap();
