import { logger } from "./config/logger.config";
import { appConfig, loadAppConfig } from './config/app.config';
import { startGRPCServer } from './config/grpc.config';
import { Server } from "@grpc/grpc-js";
import { connectDB } from "./config/mongodb.config";




async function bootstrap() {
  try {
    await loadAppConfig(logger);
    await connectDB();
    const grpcServer = await startGRPCServer(appConfig.GRPC_PORT, logger);

  

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer);
    });

    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer);
    });

  } catch (error) {
    console.log(error)
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
