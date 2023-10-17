import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]),
    MatIconModule,
    MatButtonModule
  ],
  declarations: [HomeComponent, ProfileComponent],
  exports: [HomeComponent]
})
export class UsersClientHomeModule {}
