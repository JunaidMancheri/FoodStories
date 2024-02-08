import { loadSync } from "@grpc/proto-loader";
import { loadPackageDefinition,  GrpcObject, ServiceClientConstructor, ServiceDefinition, UntypedServiceImplementation } from "@grpc/grpc-js";
import { GRPCServiceOptions } from "./options.interface";


export function getGrpcServiceDefinition(options: GRPCServiceOptions): ServiceDefinition<UntypedServiceImplementation> {

  const protoOptions = options.protoOptions || { keepCase: true ,arrays: true , }
  const packageVersion = options.packageVersion || 'v1'

  const packageDefinition = loadSync(options.protoPath, protoOptions);


  const grpcObject = (loadPackageDefinition(packageDefinition) as GrpcObject) ;

  const packageNamespace = grpcObject[options.packageName] as GrpcObject;
  if (!packageNamespace) {
    throw new Error(`GRPC-ProtoBuf: Package not found: ${options.packageName}`);
  }

  const packageVersionNamespace = packageNamespace[packageVersion] as GrpcObject;
  if (!packageVersionNamespace) {
    throw new Error(`GRPC-ProtoBuf: Package version not found: ${packageVersion}`);
  }

  const serviceConstructor = packageVersionNamespace[options.serviceName] as ServiceClientConstructor;

  if (!serviceConstructor) {
    throw new Error(`GRPC-ProtoBuf: Service not found: ${options.serviceName}`);
  }

  return serviceConstructor.service
}
