import { Options } from "@grpc/proto-loader";

export interface GRPCServiceOptions {
  protoPath: string;
  packageName: string;
  serviceName: string;
  protoOptions?: Options,
  packageVersion?: string;
}