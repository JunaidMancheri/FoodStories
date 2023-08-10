import app from "./infrastructure/config/app";
import dotenv from 'dotenv';
import { Logger } from "./infrastructure/config/logger";

dotenv.config();

const logger = new Logger('main');

async function bootstrap() {
  if (!process.env['PORT'] )  {
    throw new Error('Port must be specified');
  }
  const server = app.listen(process.env['PORT'], () => logger.info('Port is set to ' + process.env['PORT']));
  server.on('error', (err) => logger.error(err.message, err))
}

bootstrap().catch((err) => logger.error(err));