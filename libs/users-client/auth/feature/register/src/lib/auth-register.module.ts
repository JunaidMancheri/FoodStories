import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router'
import { IconsModule } from '@food-stories/shared-icons'
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SampleDirective } from './register/sample.validator';
import { MatchPasswordDirective } from './register/passwordMatch.validator';






@NgModule({
  imports: [CommonModule, RouterModule, IconsModule, HttpClientModule, FormsModule],
  providers: [GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider],
  declarations: [RegisterComponent, SampleDirective, MatchPasswordDirective],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
