import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper' 
@Component({
  selector: 'fs-create-post-stepper',
  standalone: true,
  imports: [CommonModule, CdkStepperModule],
  templateUrl: './create-post-stepper.component.html',
  styleUrls: ['./create-post-stepper.component.css'],
  providers: [{provide: CdkStepper, useExisting: CreatePostStepperComponent}]
})
export class CreatePostStepperComponent extends CdkStepper  {
 
  @Input() value!: string

  onClick(index: number): void {
    this.selectedIndex = index;
  } 

}
