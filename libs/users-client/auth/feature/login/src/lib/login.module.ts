import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router'
import { IconsModule } from '@food-stories/shared-icons';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, RouterModule, IconsModule, MatIconModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthLoginModule {}
