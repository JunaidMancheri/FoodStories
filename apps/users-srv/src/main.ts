import { logger } from '@food-stories/users-srv/core';
import { appConfig } from './config/app.config';
import { startGRPCServer } from './config/grpc.config';
import {
  connectToMongoDB,
  doTerminationCleanup,
} from '@food-stories/common/utils';
import { bootstrapKafka } from '@food-stories/common/kafka';
import { consumers, kafkaClient, topicsNeeded } from './config/kafka.config';
import { connectToNeo4j } from './config/neo4j.config';

async function bootstrap() {
  try {
    await  connectToNeo4j();
    await connectToMongoDB(appConfig.MONGODB_URI, logger);
    await bootstrapKafka(kafkaClient, topicsNeeded, consumers, logger);
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
