import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { RouterModule } from '@angular/router'




@NgModule({
  imports: [CommonModule, MatFormFieldModule, MatInputModule, RouterModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
