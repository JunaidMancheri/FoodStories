import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IComment, IPost } from '@food-stories/common/typings';
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LikesService } from '@food-stories/users-client/post/data-access';
import { RelativePipeModule } from '@food-stories/users-client/shared/utils';

interface DialogData {
  post: IPost;
  postedUser: {
    DPURL: string;
    username: string;
  };
}

@Component({
  selector: 'fs-single-post-view',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RelativePipeModule,
    NgOptimizedImage
  ],
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SinglePostViewComponent implements OnInit {
  store = inject(Store);
  likesService = inject(LikesService);
  data: DialogData = inject(MAT_DIALOG_DATA);

  commentInput = new FormControl('');

  userId = '';
  isLiked = false;
  comments: IComment[] = [];

  ngOnInit(): void {
    this.store.select(selectCurrentUserIdOrUsername).subscribe((data) => {
      this.userId = data.id;
      this.likesService
        .isPostLiked(this.data.post.id, this.userId)
        .subscribe((response) => {
          this.isLiked = response.isLiked;
        });
      this.likesService.getComments(this.data.post.id).subscribe((res) => {
        this.comments = res.comments;
      });
    });
  }

  addComment() {
    if (this.commentInput.value)
      this.likesService
        .addComment({
          postId: this.data.post.id,
          userId: this.userId,
          comment: this.commentInput.value,
        })
        .subscribe((comment) => {
          this.commentInput.setValue('')
          this.comments.push(comment);
        });
  }

  toggleLike() {
    if (this.isLiked) {
      this.likesService
        .unlikeAPost(this.data.post.id, this.userId)
        .subscribe(() => (this.isLiked = false, this.data.post.likesCount--));
    }

    if (!this.isLiked) {
      this.likesService
        .likeAPost(this.data.post.id, this.userId)
        .subscribe(() => (this.isLiked = true, this.data.post.likesCount++));
    }
  }
}
