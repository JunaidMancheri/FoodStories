import { Directive } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { AuthService } from "@food-stories/users-client/auth/data-access";
import { Observable, catchError, debounceTime, map, of, distinctUntilChanged, switchMap} from "rxjs";



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
    // return control.valueChanges.pipe(
    //   distinctUntilChanged(),
    //   debounceTime(300),
    //   switchMap((value) => this.authService.isUsernameAvailable(value)),
    //   map((isAvailable) => {
    //    return (isAvailable ? null : { usernameTaken: true })
    //   })
      
    // )  

    return this.authService.isUsernameAvailable(control.value).pipe(
      map((isAvailable) => (isAvailable ? null : { usernameTaken: true}))
    )
  }

}