import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { GrpcExceptionFilter } from '@food-stories/api-gateway/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(new ValidationPipe({ forbidNonWhitelisted: true }));

  app.useGlobalFilters(new GrpcExceptionFilter());

  app.enableCors();

  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => {
          new Logger('HTTP').log(message.replace('\n', ''));
        },
      },
    })
  );

  const config = new DocumentBuilder()
    .setTitle('FoodStories api')
    .setDescription('Apis for foodstories system')
    .setVersion('1.0')
    .addTag('foodstories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${'api'}`);
}

bootstrap();
