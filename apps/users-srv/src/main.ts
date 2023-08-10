import app from "./infrastructure/config/app";
import dotenv from 'dotenv';
import { Logger } from "./infrastructure/config/logger";
import { server as grpcServer } from './infrastructure/config/grpc';
import { ServerCredentials } from "@grpc/grpc-js";

dotenv.config();

const logger = new Logger('main');

async function bootstrap() {
  if (!process.env['PORT'] )  {
    throw new Error('Port must be specified');
  }
  grpcServer.bindAsync('4000', ServerCredentials.createInsecure(), (err, port) => {
    logger.info('grpc server connectted to port: ' + port);
  })
  const server = app.listen(process.env['PORT'], () => logger.info('Port is set to ' + process.env['PORT']));
  server.on('error', (err) => logger.error(err.message, err))
}

bootstrap().catch((err) => logger.error(err));