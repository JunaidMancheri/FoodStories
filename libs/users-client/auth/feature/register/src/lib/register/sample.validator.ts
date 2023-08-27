import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
  selector: '[sample]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SampleDirective,
    multi: true

  }]
})
export class SampleDirective implements Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('helo helo helo');
    return null;
  }
  
}