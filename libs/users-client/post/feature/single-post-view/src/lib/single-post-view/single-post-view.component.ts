import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IPost } from '@food-stories/common/typings';
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { ReactiveFormsModule } from '@angular/forms';
import { LikesService } from '@food-stories/users-client/post/data-access';

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
  ],
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css'],
})
export class SinglePostViewComponent implements OnInit {
  store = inject(Store);
  likesService = inject(LikesService);
  data: DialogData = inject(MAT_DIALOG_DATA);

  userId = '';
  isLiked = false;

  ngOnInit(): void {
    this.store.select(selectCurrentUserIdOrUsername).subscribe((data) => {
      this.userId = data.id;
      this.likesService
        .isPostLiked(this.data.post.id, this.userId)
        .subscribe((response) => {
          this.isLiked = response.isLiked;
        });
    });
  }

  toggleLike() {
    if (this.isLiked) {
      this.likesService
        .unlikeAPost(this.data.post.id, this.userId)
        .subscribe(() => (this.isLiked = false));
    }

    if (!this.isLiked) {
      this.likesService
        .likeAPost(this.data.post.id, this.userId)
        .subscribe(() => (this.isLiked = true));
    }
  }
}
