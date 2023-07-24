import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginModule } from '../../../login/src/lib/login.module';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AuthRegisterModule } from '../../../register/src/lib/auth-register.module';

@NgModule({
  imports: [
    CommonModule,
    AuthLoginModule,
    AuthRegisterModule,
    RouterModule.forChild(authRoutes)
  ],
})
export class AuthShellModule {}
