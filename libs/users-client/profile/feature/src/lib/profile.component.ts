import { Component, OnInit } from '@angular/core';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import { ProfileService } from './profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fs-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  currUser$ = this.profileStore.user$;
  isOwnProfile$ = this.profileService.isOwnProfile$;

  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.profileService.loadUserDetails(username);
  }
}
