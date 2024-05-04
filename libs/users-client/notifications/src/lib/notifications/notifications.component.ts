import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { Store } from '@ngrx/store'

@Component({
  selector: 'fs-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  ngOnInit(): void {
    this.store.select(selectCurrentUserIdOrUsername).subscribe((id) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.http.get<{notifications: any[]}>('https://app.foodstories.fun/api/v1/users/notifications/' + id.id).subscribe((res) => {
       this.notifications = res.notifications
      })

    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  notifications: any[] = []
  store = inject(Store)
  http = inject(HttpClient)



}
