import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router'
import { IconsModule } from '@food-stories/shared-icons'
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatchPasswordDirective } from './register/passwordMatch.validator';
import { MatSnackBarModule } from '@angular/material/snack-bar';






@NgModule({
  imports: [CommonModule, RouterModule, IconsModule, HttpClientModule, FormsModule, MatSnackBarModule],
  providers: [GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider],
  declarations: [RegisterComponent, MatchPasswordDirective],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
