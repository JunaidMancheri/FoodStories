import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router'
import { IconsModule } from '@food-stories/shared-icons'




@NgModule({
  imports: [CommonModule, RouterModule, IconsModule],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class AuthRegisterModule {}
