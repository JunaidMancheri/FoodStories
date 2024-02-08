import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { REF_PATHS } from '@food-stories/users-client/shared/config';
import { BioSectionService } from '../bio-section.service';
import { FormatedBioModule } from '@food-stories/users-client/shared/utils';

@Component({
  selector: 'fs-bio-section',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FormatedBioModule],
  providers: [ConfirmDialogService],
  templateUrl: './bio-section.component.html',
  styleUrls: ['./bio-section.component.css'],
})
export class BioSectionComponent implements OnChanges {
  constructor(
    private auth: Auth,
    private router: Router,
    private dialog: MatDialog,
    private confirmDialogService: ConfirmDialogService,
    private bioSectionService: BioSectionService,
    private profileStore: ProfileStore
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

  @Input({ required: true }) currentUser!: IUser | null;
  @Input({ required: true }) isOwnProfile!: boolean | null;
  DPURL!: string;

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
          const uploadTask = this.bioSectionService.uploadDP(result.formData.id, result.dpFile)
          uploadTask.then(() => {
            this.bioSectionService
            .getDownloadURLWithRetry(result.formData.id)
            .subscribe((url) => {
              this.profileStore.persistEditsToServer({
                ...result.formData,
                DPURL: url,
              });
            });
          })
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
          this.router.navigateByUrl('/auth');
        }
      });
  }
}
