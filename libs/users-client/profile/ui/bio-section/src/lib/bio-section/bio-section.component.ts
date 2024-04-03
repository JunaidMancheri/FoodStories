import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '@food-stories/common/typings';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '@food-stories/users-client/profile/ui/edit-profile-dialog';
import { ConfirmDialogService } from '@food-stories/users-client/shared/ui/confirm-dialog';
import {
  EditProfileDialogResult,
  ProfileStore,
} from '@food-stories/users-client/profile/data-access';
import {
  API_ENDPOINTS,
  REF_PATHS,
} from '@food-stories/users-client/shared/config';
import { BioSectionService } from '../bio-section.service';
import { FormatedBioModule } from '@food-stories/users-client/shared/utils';
import { Store } from '@ngrx/store';
import {
  AppActions,
  selectCurrentUser,
  selectCurrentUserIdOrUsername,
} from '@food-stories/users-client/shared/app-init';
import { HttpClient } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '@food-stories/users-client/profile/feature';

@Component({
  selector: 'fs-bio-section',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormatedBioModule,
    MatMenuModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  providers: [ConfirmDialogService],
  templateUrl: './bio-section.component.html',
  styleUrls: ['./bio-section.component.css'],
})
export class BioSectionComponent implements OnChanges, OnInit {
  constructor(
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog,
    private confirmDialogService: ConfirmDialogService,
    private bioSectionService: BioSectionService,
    private profileStore: ProfileStore,
    private store: Store,
    private http: HttpClient,
    private service: ProfileService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('currentUser' in changes) {
      if (this.currentUser?.DPURL) {
        this.DPURL = this.currentUser.DPURL;
      } else {
        this.DPURL = REF_PATHS.NO_DP_PATH;
      }
    }
  }

  isPrivate: boolean | undefined;

  @Input({ required: true }) currentUser!: IUser | null;
  @Input({ required: true }) isOwnProfile!: boolean | null;
  @Input({ required: true }) isFollowing: boolean | null = false;
  @Input({ required: true }) isBlocked: boolean | null = false;
  DPURL!: string;
  activeUserid!: string;

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.activeUserid = user.id;
      this.isPrivate = user.isPrivate;
    });
  }

  unblockUser() {
    if (this.currentUser && this.currentUser.id)
      this.http
        .delete(API_ENDPOINTS.SocialNetworks.unblockUser(this.currentUser.id), {
          body: { blockerId: this.activeUserid },
        })
        .subscribe(() => {
          this.service.unblockUser();
        });
  }

  blockUser() {
    if (this.currentUser && this.currentUser.id)
      this.http
        .post(API_ENDPOINTS.SocialNetworks.blockUser(this.currentUser.id), {
          blockerId: this.activeUserid,
        })
        .subscribe(() => {
          this.service.blockUser();
        });
  }

  changeAccountPrivacey() {
    if (this.isPrivate) {
      if (this.currentUser)
        this.http
          .patch(API_ENDPOINTS.Users.makeAccountPublic(this.currentUser.id), {})
          .subscribe(() => {
            this.isPrivate = false;
          });
    } else {
      if (this.currentUser)
        this.http
          .patch(
            API_ENDPOINTS.Users.makeAccountPrivate(this.currentUser.id),
            {}
          )
          .subscribe(() => {
            this.isPrivate = true;
          });
    }
  }

  followUser() {
    this.store
      .select(selectCurrentUserIdOrUsername)
      .subscribe((idOrusername) => {
        if (this.currentUser && this.currentUser.id)
          this.http
            .post(
              API_ENDPOINTS.SocialNetworks.followAUser(this.currentUser.id),
              {
                followerId: idOrusername.id,
                followerUsername: idOrusername.username,
              }
            )
            .subscribe(() => {
              console.log(idOrusername, this.currentUser);
              this.profileStore.addNewFollower();
              this.isFollowing = true;
            });
      });
  }

  unfollowUser() {
    this.store
      .select(selectCurrentUserIdOrUsername)
      .subscribe((idOrusername) => {
        if (this.currentUser && this.currentUser.id)
          this.http
            .delete(
              API_ENDPOINTS.SocialNetworks.unFollowAUser(this.currentUser.id),
              { body: { followerId: idOrusername.id } }
            )
            .subscribe(() => {
              this.profileStore.removeFollower();
              this.isFollowing = false;
            });
      });
  }
  onError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = REF_PATHS.NO_DP_PATH;
    setTimeout(() => {
      if (this.currentUser?.DPURL) {
        target.src = this.currentUser.DPURL;
      }
    }, 2000);
  }

  openEditDialog() {
    this.router.navigate([], { fragment: 'edit-profile' });

    const dialogRef = this.dialog.open<
      EditProfileDialogComponent,
      IUser,
      EditProfileDialogResult
    >(EditProfileDialogComponent, { data: this.currentUser });
    dialogRef.disableClose = true;
    dialogRef.beforeClosed().subscribe(async (result) => {
      // TODO: handle persiste  to error case;
      // TODO: progress  bar and  proper snackbar;
      if (result) {
        this.profileStore.updateUserProfile(result.formData);
        if (result.dpFile) {
          const uploadTask = this.bioSectionService.uploadDP(
            result.formData.id,
            result.dpFile
          );
          uploadTask.then(() => {
            this.bioSectionService
              .getDownloadURLWithRetry(result.formData.id)
              .subscribe((url) => {
                this.profileStore.persistEditsToServer({
                  ...result.formData,
                  DPURL: url,
                });
              });
          });
        } else {
          if (result.formData.DPURL === '' && this.currentUser?.DPURL !== '') {
            this.bioSectionService.deleteDP(result.formData.id);
          }
          this.profileStore.persistEditsToServer(result.formData);
        }
      }
      this.router.navigate([]);
    });
  }

  logoutUser() {
    this.confirmDialogService
      .openDialog({
        title: 'Logout',
        content: 'Are you sure you want to log out ?',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.auth.signOut();
          this.store.dispatch(AppActions.logoutUser());
          this.router.navigateByUrl('/auth');
        }
      });
  }
}
