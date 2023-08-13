import dotenv from 'dotenv';
import { Logger } from "./infrastructure/logger.config";
import { loadAppConfig } from './infrastructure/app.config';
import { startGRPCServer } from './infrastructure/grpc.config';

dotenv.config();

const logger = new Logger('main');

async function bootstrap() {
  loadAppConfig(logger);
  await startGRPCServer(logger);
}

bootstrap().catch((err) => {
  logger.error(err);
});