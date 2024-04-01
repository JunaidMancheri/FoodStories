import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CreatePostStepperComponent } from '@food-stories/users-client/post/ui/create-post-stepper';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { getImageUrlFromFile } from '@food-stories/users-client/shared/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreatePostService } from './create-post.service';
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import {
  Storage,
  StorageReference,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { Auth } from '@angular/fire/auth';
import { REF_PATHS } from '@food-stories/users-client/shared/config';
import {  NewPostEventsService } from '@food-stories/users-client/profile/feature';
import { from, zip } from 'rxjs';
@Component({
  selector: 'fs-create-post',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    CreatePostStepperComponent,
    CdkStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatProgressBarModule,
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostDialogComponent implements OnInit {
  @ViewChild(CreatePostStepperComponent) stepper!: CdkStepper;

  dialogRef = inject(MatDialogRef<CreatePostDialogComponent>)
  createPostService = inject(CreatePostService);
  store = inject(Store);
  storage = inject(Storage);
  auth = inject(Auth);
  newPostEventService = inject(NewPostEventsService);
  mediaUrls: string[] = [];


  filePartitions = 0;
  fileUploadProgress = 0;
  progressCaption = 'Getting ready to upload...'

  userId!: string;
  postId: string | undefined;

  ngOnInit(): void {
    this.store
      .select(selectCurrentUserIdOrUsername)
      .subscribe((userIdOrUsername) => (this.userId = userIdOrUsername.id));
  }

  files!: FileList;
  imageUrls: string[] = [];

  caption = new FormControl();

  async onFileAdd(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        this.imageUrls.push(await getImageUrlFromFile(files[i]));
      }
      this.filePartitions = 85/files.length
      this.stepper.next();
    }
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  sha : UploadTask[] = [];

    sharePost() {
      this.stepper.next();

    const refPaths: StorageReference[] = [];
    
    this.createPostService
      .createPost(this.caption.value, this.userId)
      .subscribe( async (res) => {
        this.fileUploadProgress = 5
        this.progressCaption = 'Uploading  medias...'
        for (let i = 0; i < this.files.length; i++) {
          const refPath = ref(this.storage, REF_PATHS.getOriginalPostPath(res.id, res.userId, i));
          const upload = uploadBytesResumable(refPath, this.files[i]);
          this.sha.push(upload)
          this.calcuateUploadProgress(upload);
          this.onUploadFinish(upload, refPaths, res.id, res.userId)
          refPaths.push(refPath);
        }
      });

  
  }

  private getDownloadUrlsAndSyncToTheServer(refPaths: StorageReference[], id: string, userId: string) {
    this.fileUploadProgress = 95;
    this.progressCaption = 'Getting ready your medias...';
    zip(
      from(Promise.all(refPaths.map(refs => getDownloadURL(refs)))), 
      this.createPostService.getDownloadURLWithRetry(id, userId))
      .subscribe(([mediaUrls, thumbnailUrl]) => {
        this.progressCaption = 'Syncing your changes...';
        this.fileUploadProgress = 98;
      this.createPostService.updatePostMediaUrls(id, mediaUrls, thumbnailUrl)
      .subscribe((res) => {
        this.newPostEventService.setNewPost(res)
        this.dialogRef.close();
      });
    })
  }

  private calcuateUploadProgress(task: UploadTask) {
    let lastBytesTransferred = 0;
    task.on('state_changed', snapshot=> {
      const percentageIncrease = ((snapshot.bytesTransferred - lastBytesTransferred) / snapshot.totalBytes) * this.filePartitions;
      lastBytesTransferred = snapshot.bytesTransferred;
      this.fileUploadProgress += percentageIncrease;
    })
  }

  private onUploadFinish(task: UploadTask,refPaths: StorageReference[], id: string, userId: string) {
    task.then(() => {
      if (this.sha.every(task => task.snapshot.state === 'success')) {
       this.getDownloadUrlsAndSyncToTheServer(refPaths, id, userId);
      }
    } )
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.files = files;
      console.log(this.files);
      this.stepper.next();
    }
  }
}
