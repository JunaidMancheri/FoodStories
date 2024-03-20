import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { selectCurrentUser } from '@food-stories/users-client/shared/app-init';
import { Store } from '@ngrx/store';
import { NotificationsWebsocket } from './websocket.service';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isInitialLoading = false;
  constructor(
    private auth: Auth,
    private store: Store,
    private ws: NotificationsWebsocket
  ) {}
  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      if (user && user.email && user.id) {
        this.ws
          .connect(user.id)
      }
    });

    setTimeout(() => {
      this.isInitialLoading = false;
    }, 1000);
  }
}
