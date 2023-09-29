import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@food-stories/shared-icons';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '@food-stories/users-client/auth/data-access'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    MatIconModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [AuthService],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthLoginModule {}
