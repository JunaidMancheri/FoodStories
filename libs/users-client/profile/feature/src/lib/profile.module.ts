import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatIconModule } from '@angular/material/icon';
import { BioSectionComponent } from '@food-stories/users-client/profile/ui/bio-section';
import { HighlightsComponent } from '@food-stories/users-client/profile/ui/highlights';
import { PostsComponent } from '@food-stories/users-client/profile/ui/posts';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import { ProfileHttpService } from '@food-stories/users-client/shared/data-access';
import { ProfileService } from './profile.service';
import { EditProfileDialogComponent } from '@food-stories/users-client/profile/ui/edit-profile-dialog'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    MatIconModule,
    BioSectionComponent,
    HighlightsComponent,
    PostsComponent,
    EditProfileDialogComponent
  ],
  providers: [ProfileHttpService, ProfileStore, ProfileService],
  declarations: [ProfileComponent],
})
export class ProfileModule {}
