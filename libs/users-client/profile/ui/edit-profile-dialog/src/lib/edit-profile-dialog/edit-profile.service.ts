import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { FormControl } from '@angular/forms';

@Injectable()
export class EditProfileService {
  private isUsernameAvailableSubject$ = new BehaviorSubject(true);
  isUsernameAvailable$ = this.isUsernameAvailableSubject$.asObservable();
  private isLoadingSubject$ = new BehaviorSubject(false);
  isLoading$ = this.isLoadingSubject$.asObservable();

  constructor(private httpService: ProfileHttpService) {}

  makeUsernameValidator(
    control: FormControl<string | null>,
    initialUsername: string
  ) {
    control.valueChanges
      .pipe(
        distinctUntilChanged(),
        filter((username) =>
          control.valid && username !== initialUsername
            ? (this.isLoadingSubject$.next(true), true)
            : (this.isLoadingSubject$.next(false), false)
        ),
        debounceTime(300),
        switchMap((username) =>
          this.httpService
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .isUsernameAvailable(username!)
            .pipe(catchError(() => EMPTY))
        )
      )
      .subscribe((isAvailable) => {
        this.isLoadingSubject$.next(false);
        return isAvailable
          ? this.isUsernameAvailableSubject$.next(true)
          : this.isUsernameAvailableSubject$.next(false);
      });
  }
}
