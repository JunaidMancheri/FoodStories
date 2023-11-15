import { catchError, Observable} from 'rxjs';
import { GrpcException } from './grpc.exception';


export function handleGrpcError<T>(source: Observable<T>): Observable<T> {
  return source.pipe(
    catchError((error) => {
      throw new GrpcException(error);
    })
  );
}