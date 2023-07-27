import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router'
import { IconsModule } from '@food-stories/shared-icons'
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';




@NgModule({
  imports: [CommonModule, RouterModule, IconsModule],
  providers: [GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
