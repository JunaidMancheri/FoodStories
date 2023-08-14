import { Server, ServerCredentials } from "@grpc/grpc-js";
import { ILogger } from "../logger";

export function createStartGRPCServer (grpcServer: Server, port: string) {
  return function startGRPCServer (logger: ILogger) {
    return new Promise<Server>((resolve, reject) =>{
      grpcServer.bindAsync(port, ServerCredentials.createInsecure(), (err, startedPort) => {
        if (err) reject(err);
        else {
          grpcServer.start();
          logger.info('grpc server connectted to port: ' + startedPort );
          resolve(grpcServer);
        }
      })
    })
  }
}