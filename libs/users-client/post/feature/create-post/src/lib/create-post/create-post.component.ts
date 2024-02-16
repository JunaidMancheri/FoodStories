import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CreatePostStepperComponent } from '@food-stories/users-client/post/ui/create-post-stepper';
import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { getImageUrlFromFile } from '@food-stories/users-client/shared/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreatePostService } from './create-post.service';
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
  ],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostDialogComponent {
  @ViewChild(CreatePostStepperComponent) stepper!: CdkStepper;

  createPostService = inject(CreatePostService);


  files!: FileList;
  imageUrls : string[] = [];

  description = new FormControl();


  async onFileAdd(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    if (files && files.length > 0) {
      this.files = files;
      for (let i = 0; i < files.length ; i++) {
        this.imageUrls.push(await getImageUrlFromFile(files[i]))
      }
      this.stepper.next();
    }
  }

  trackByFn(index: number, item: string): string {
    return item
  }


  sharePost() {
     this.createPostService.createPost(this.description.value).subscribe();
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
