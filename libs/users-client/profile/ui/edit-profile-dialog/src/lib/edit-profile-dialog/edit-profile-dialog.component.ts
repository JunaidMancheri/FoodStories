/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '@food-stories/common/typings';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmDialogService } from '@food-stories/users-client/shared/ui/confirm-dialog';
import { EditProfileService } from './edit-profile.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  SnackBarService,
  TransformUsernameDirective,
  UsernameValidator,
  getImageUrlFromFile,
} from '@food-stories/users-client/shared/utils';
import { combineLatest, map, startWith } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditProfileDialogResult } from '@food-stories/users-client/profile/data-access';
import { REF_PATHS } from '@food-stories/users-client/shared/config';

@Component({
  selector: 'fs-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  standalone: true,
  providers: [ConfirmDialogService, EditProfileService, SnackBarService],
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    TransformUsernameDirective,
    MatSnackBarModule,
  ],
})
export class EditProfileDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private dialogRef: MatDialogRef<
      EditProfileDialogComponent,
      EditProfileDialogResult
    >,
    private confirmDialogService: ConfirmDialogService,
    private editProfileService: EditProfileService,
    private snackBarService: SnackBarService
  ) {}
  
  selectedFile: File | null = null;
  imgSrc = this.data.DPURL || REF_PATHS.NO_DP_PATH
  canSubmit = false;
  isLoading$ = this.editProfileService.isLoading$;
  isUsernameAvailable$ = this.editProfileService.isUsernameAvailable$;

  form = new FormGroup({
    id: new FormControl(this.data.id),
    name: new FormControl(this.data.name),
    username: new FormControl(this.data.username, {
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        UsernameValidator,
      ],
    }),
    bio: new FormControl(this.data.profile?.bio),
    gender: new FormControl(this.data.profile?.gender),
    DPURL: new FormControl(this.data.DPURL),
  });

  ngOnInit() {
    this.editProfileService.makeUsernameValidator(
      this.form.controls.username,
      this.data.username
    );

    combineLatest([
      this.form.statusChanges.pipe(
        startWith(this.form.status),
        map((status) => status === 'VALID')
      ),
      this.isUsernameAvailable$,
    ])
      .pipe(
        map(
          ([isFormValid, yourStreamValue]) =>
            isFormValid &&
            (this.form.controls.username.value === this.data.username ||
              yourStreamValue)
        )
      )
      .subscribe((canSubmit) => (this.canSubmit = canSubmit));
  }

  onClose() {
    if (this.canSubmit) {
      this.confirmDialogService
        .openDialog({
          content: 'Are you sure making the edits?',
          title: 'Edit profile',
          noButton: 'No, cancel',
          yesButton: 'Yes, edit profile',
        })
        .subscribe((confirmed) => {
          if (confirmed) {
            const formData: EditProfileDialogResult = {
              dpFile: this.selectedFile,
              formData: {
                id: this.form.value.id!,
                name: this.form.controls.name.value!,
                bio: this.form.controls.bio.value || null,
                gender: this.form.value.gender || 'notMentioned',
                DPURL: this.form.value.DPURL || '',
                username: this.form.value.username!,
              },
            };
            this.dialogRef.close(formData);
          }
        });
    } else {
      this.snackBarService.openSnackBar('Please properly fill the form');
    }
  }

  async onImageUpload(el: EventTarget | null) {
    const file = (el as HTMLInputElement).files?.item(0) as File;
    this.imgSrc = await getImageUrlFromFile(file);
    this.form.controls.DPURL.setValue(this.imgSrc);
    this.selectedFile = file;
  }

  removeDp() {
    this.imgSrc = REF_PATHS.NO_DP_PATH
    this.form.controls.DPURL.setValue('');
  }

  onCancel() {
    this.confirmDialogService
      .openDialog({
        title: 'Discard changes',
        content: 'Are you sure to cancel the changes?',
        noButton: 'No, keep',
        yesButton: 'Yes, cancel',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.dialogRef.close();
        }
      });
  }
}
