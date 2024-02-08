import { Directive } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { AuthService } from "@food-stories/users-client/auth/data-access";
import { Observable, debounceTime, distinctUntilChanged, map, of, switchMap} from "rxjs";



@Directive({
  selector: '[username-available]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameAvailableValidator,
      multi: true,
    }
  ]
})
export class UsernameAvailableValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((username: string) => this.authService.isUsernameAvailable(username).pipe(
        map((isAvailable) => (isAvailable ? null: { usernameTaken: true}))
      ))
    )
  }

}