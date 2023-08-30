import { HttpClient } from "@angular/common/http";
import { Directive } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, NG_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Observable, debounceTime, of, timer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators'; // Add switchMap

@Directive({
  selector: '[sample]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: SampleDirective,
    multi: true

  }]
})
export class SampleDirective implements AsyncValidator {

  constructor( private http: HttpClient) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return of(null);
    
  }


  fake(): Observable<null> {
    // console.log('h');
    
    // const call =  this.http.get('http://localhost:3000/api/v1/users/username/check');
    // call.subscribe((err) =>{});
    return of(null);
  }


}
