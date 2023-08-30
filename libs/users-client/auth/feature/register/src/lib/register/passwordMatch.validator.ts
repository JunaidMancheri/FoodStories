import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";


@Directive({
  selector: '[matchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true,    
  }]
})
export class MatchPasswordDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
     if(this.isPasswordsMatch(control)) {
      return null;
     }  else {
      return {
        isPasswordsDoNotMatch: true,
      }
     }
  }

  isPasswordsMatch(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password?.dirty && confirmPassword?.dirty && password.value === confirmPassword.value;
  }

  
}