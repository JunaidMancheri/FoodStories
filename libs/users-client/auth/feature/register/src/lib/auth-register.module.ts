import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@food-stories/shared-icons';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './register/passwordMatch.validator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '@food-stories/users-client/auth/data-access';
import { AuthHttpService } from '@food-stories/users-client/auth/data-access';
import { UsernameAvailableValidator } from './register/usernameAvailable.validator';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [AuthService, AuthHttpService],
  declarations: [RegisterComponent, MatchPasswordDirective, UsernameAvailableValidator],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
