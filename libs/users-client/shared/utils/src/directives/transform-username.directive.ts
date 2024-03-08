/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[fsTransformUsername]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransformUsernameDirective),
      multi: true
    }
  ]
})
export class TransformUsernameDirective implements ControlValueAccessor {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  private onChange!: any
  private onTouched!: any

  @HostListener('input', ['$event.target']) onInput(target: HTMLInputElement): void {
    const transformedValue = target.value.replace(/\s+/g, '_').toLowerCase();
    this.onChange(transformedValue);
    this.renderer.setProperty(target, 'value', transformedValue)
  }

  writeValue(value: any): void {
    const transformedValue = value.replace(/\s+/g, '_').toLowerCase();
    this.renderer.setProperty(this.el.nativeElement, 'value', transformedValue); 
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
