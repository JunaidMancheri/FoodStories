import { Logger } from "./infrastructure/logger.config";
import { loadAppConfig } from './infrastructure/app.config';
import { startGRPCServer } from './infrastructure/grpc.config';
import { Server } from "@grpc/grpc-js";

const logger = new Logger('main');

async function bootstrap() {
  try {
    loadAppConfig(logger);
    const grpcServer = await startGRPCServer(logger);

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer);
    });

    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer);
    });

  } catch (error) {
    logger.error('An error occurred during bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();

function doTerminationCleanup(grpcServer: Server) {
  logger.info('Shutting down gRPC server');
  grpcServer.forceShutdown();
  logger.info('Cleanup complete. Exiting.');
  process.exit(0);
}
