import { ILogger } from "@food-stories/common/logger";
import { Server } from "@grpc/grpc-js";

export function doTerminationCleanup(grpcServer: Server, logger: ILogger) {
  logger.info('Shutting down gRPC server');
  grpcServer.forceShutdown();
  logger.info('Cleanup complete. Exiting.');
  process.exit(0);
}
