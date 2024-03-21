import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileStore } from '@food-stories/users-client/profile/data-access';
import { ProfileService } from './profile.service';
import { ActivatedRoute,  } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fs-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  currUser$ = this.profileStore.user$;
  isOwnProfile$ = this.profileService.isOwnProfile$;
  posts$ = this.profileStore.posts$;
  isFollowing$ = this.profileService.isFollowing$;

  routeSub!: Subscription;

  constructor(
    private profileStore: ProfileStore,
    private profileService: ProfileService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => this.profileService.loadUserDetails(params['username']));
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
