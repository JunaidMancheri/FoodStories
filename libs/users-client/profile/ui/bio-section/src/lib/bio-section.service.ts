import { Injectable } from '@angular/core';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from '@angular/fire/storage';
import { REF_PATHS } from '@food-stories/users-client/shared/config';
import {
  EMPTY,
  Observable,
  catchError,
  concatMap,
  delay,
  from,
  of,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BioSectionService {
  constructor( private storage: Storage) {}


  deleteDP(id: string) {
    deleteObject(ref(this.storage, REF_PATHS.getThumbDpPath(id))).catch(() => '')
  }

  uploadDP(id: string, dpFile: File) {
    const refPath = ref(this.storage, REF_PATHS.getOriginalDpPath(id));
    return uploadBytesResumable(refPath, dpFile)
  }
   getDownloadURLWithRetry(
    id: string,
    attempts = 3,
    delayMs = 4000
  ): Observable<string> {
    const storageRef = ref(this.storage, REF_PATHS.getThumbDpPath(id))
    return from(getDownloadURL(storageRef)).pipe(
      catchError((error) => {
        if (error.code === 'storage/object-not-found' && attempts > 0) {
          return of(error).pipe(
            delay(delayMs),
            concatMap(() =>
              this.getDownloadURLWithRetry(id, attempts - 1, delayMs)
            )
          );
        }
        // handler error from getDownloadUrl function;
        return throwError(() => EMPTY);
      })
    );
  }
}
