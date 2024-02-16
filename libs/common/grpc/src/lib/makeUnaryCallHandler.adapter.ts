import { ServerErrorResponse, handleUnaryCall } from '@grpc/grpc-js';
import {
  BaseHandler,
  HandlerType,
  RequestPayload,
} from '@food-stories/common/handlers';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { ILogger } from '@food-stories/common/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function makeUnaryCallHandler(
  handler: BaseHandler,
  logger: ILogger
): handleUnaryCall<any, any> {
  return async (call, callback) => {
    const request: RequestPayload = {
      type: HandlerType.RPC,
      data: call.request,
      metadata: call.metadata,
    };

    const path = call.getPath();
    const method = path.substring(path.lastIndexOf('/') + 1);

    logger.info(`method called: ${method}`);

    const response = await handler.handle(request);

    if (response.status == 'error') {
      const error: ServerErrorResponse = {
        message: response.error.message,
        name: response.error.name,
        code: mapAppErrorToGrpcError(response.error.code),
      };

      logger.error(error.message, error);

      callback(error);
    } else {
      callback(null, response.data);
    }

    logger.info('Call ended: ' + method);
  };
}

function mapAppErrorToGrpcError(statusCode: number): Status {
  switch (statusCode) {
    case 404:
      return Status.NOT_FOUND;
    case 409:
      return Status.ALREADY_EXISTS;
    default:
      return Status.UNKNOWN;
  }
}
