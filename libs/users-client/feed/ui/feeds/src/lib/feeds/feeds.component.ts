import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FeedItemComponent } from '@food-stories/users-client/post/ui/feed-item';
import { IPost, IUser } from '@food-stories/common/typings';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { filter, take } from 'rxjs';

@Component({
  selector: 'fs-feeds',
  standalone: true,
  imports: [CommonModule, MatIconModule, FeedItemComponent],
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css'],
})
export class FeedsComponent implements OnInit {
  posts: IPost[] = [];
  users!: Pick<IUser, 'DPURL' | 'username' | 'id'>[]
  http = inject(HttpClient);
  store = inject(Store);
  userId!: string 
  username!: string 
  DPURL!: string

  getPostedUser(userId: string) {
    if (userId === this.userId) return {
      id: this.userId,
      username: this.username,
      DPURL: this.DPURL
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.users.find((user) => user.id === userId)!;
  }

  ngOnInit() {
    this.store
      .select(selectCurrentUserIdOrUsername)
      .pipe(
        filter((data) => Boolean(data.id)),
        take(1)
      )
      .subscribe((data) => {
        this.http
          .get<{ posts: IPost[] , users: []}>(API_ENDPOINTS.Feeds.getFeed(data.id))
          .subscribe((res) => {
            this.username = data.username;
            this.userId = data.id;
            this.DPURL = data.DPURL;
            this.users = res.users;
            this.posts = res.posts;
          });
      });
  }
}
