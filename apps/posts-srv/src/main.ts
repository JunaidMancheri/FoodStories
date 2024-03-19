import { logger } from "@food-stories/posts-srv/core";
import { appConfig, envKeys } from './config/app.config';
import { startGRPCServer } from './config/grpc.config';
import { connectToMongoDB, doTerminationCleanup, loadAppConfig } from '@food-stories/common/utils'


async function bootstrap() {
  try {
    await loadAppConfig(envKeys, appConfig, logger);
    await connectToMongoDB(appConfig.MONGODB_URI, logger);
    const grpcServer = await startGRPCServer(appConfig.GRPC_PORT, logger);
  

    process.on('SIGTERM', async () => {
      logger.info('Received SIGTERM. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer, logger);
    });

    process.on('SIGINT', async () => {
      logger.info('Received SIGINT. Initiating graceful shutdown...');
      doTerminationCleanup(grpcServer, logger);
    });

  } catch (error) {
    logger.error('An error occurred during bootstrap:', error);
    process.exit(1);
  }
}

bootstrap();

