import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './authLayout/auth-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AuthLayoutComponent],
  exports: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
