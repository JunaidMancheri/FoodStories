import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '@food-stories/common/typings';
import { selectCurrentUser } from '@food-stories/users-client/shared/app-init';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fs-feed',
  templateUrl: 'feed.component.html',
  styleUrls: ['feed.component.css'],
})
export class FeedComponent implements OnInit {
  user!: IUser;
  store = inject(Store);
  ngOnInit(): void {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.user = user));
  }
}
