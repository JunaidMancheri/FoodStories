import { Directive } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { AuthService } from "@food-stories/users-client/auth/data-access";
import { Observable, map} from "rxjs";



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
    return this.authService.isUsernameAvailable(control.value).pipe(
      map((isAvailable) => (isAvailable ? null : { usernameTaken: true}))
    )
  }

}