import app from "./infrastructure/config/app";
import dotenv from 'dotenv';
import { Logger } from "./infrastructure/config/logger";

dotenv.config();

const logger = new Logger('main');

async function bootstrap() {
  if (!process.env['PORT'] )  {
    throw new Error('Port must be specified');
  }
  app.listen(process.env['PORT'], () => logger.info('Port is set to ' + process.env['PORT']));
}

bootstrap().catch((err) => logger.error(err));