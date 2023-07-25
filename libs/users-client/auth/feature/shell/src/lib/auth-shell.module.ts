import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginModule } from '@food-stories/users-client/auth/feature/login';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AuthRegisterModule } from '@food-stories/users-client/auth/feature/register';
import { AuthLayoutModule } from '@food-stories/users-client/auth/ui/layout';

@NgModule({
  imports: [
    CommonModule,
    AuthLoginModule,
    AuthRegisterModule,
    AuthLayoutModule,
    RouterModule.forChild(authRoutes)
  ],
})
export class AuthShellModule {}
