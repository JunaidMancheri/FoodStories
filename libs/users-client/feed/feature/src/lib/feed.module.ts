import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FeedComponent } from './feed.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoriesComponent } from '@food-stories/users-client/feed/ui/stories'
import { FeedsComponent } from '@food-stories/users-client/feed/ui/feeds';
import { MiniNotificationsComponent } from '@food-stories/users-client/feed/ui/mini-notifications'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: FeedComponent}]),
    MatIconModule,
    MatButtonModule,
    StoriesComponent,
    FeedsComponent,
    MiniNotificationsComponent,
  ],
  declarations: [FeedComponent]
})
export class FeedModule {}
