import { catchError, Observable} from 'rxjs';
import { GrpcException } from './grpc.exception';
import { Logger } from '@nestjs/common';


export function handleGrpcError<T>(source: Observable<T>): Observable<T> {
  return source.pipe(
    catchError((error) => {
      Logger.error(error.message);
      throw new GrpcException(error);
    })
  );
}