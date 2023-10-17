import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BioSectionComponent } from '@food-stories/users-client/profile/ui/bio-section';
import { HighlightsComponent } from '@food-stories/users-client/profile/ui/highlights';
import { PostsComponent } from '@food-stories/users-client/profile/ui/posts';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    MatIconModule,
    MatButtonModule,
    BioSectionComponent,
    HighlightsComponent,
    PostsComponent,
  ],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
