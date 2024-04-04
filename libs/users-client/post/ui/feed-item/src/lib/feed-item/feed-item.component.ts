import { Component , Input, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IPost } from '@food-stories/common/typings';
import { RelativePipeModule } from '@food-stories/users-client/shared/utils';
import { LikesService } from '@food-stories/users-client/post/data-access';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { SinglePostViewComponent } from '@food-stories/users-client/post/feature/single-post-view';
@Component({
  selector: 'fs-feed-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, RelativePipeModule, MatDialogModule],
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css'],
})
export class FeedItemComponent implements OnInit {
  @Input({required: true}) post!: IPost
  @Input({required: true}) userId!: string;
  @Input({required: true}) username!: string;
  isLiked!: boolean

  likeService  = inject(LikesService);
  matDialog =  inject(MatDialog)

  

  ngOnInit(): void {
    this
      this.likeService.isPostLiked(this.post.id, this.userId).subscribe((res) => {
         this.isLiked = res.isLiked;
      })
  }

  toggleLike() {
    if (this.isLiked) {
      this.likeService
        .unlikeAPost(this.post.id, this.userId)
        .subscribe(() => (this.isLiked = false, this.post.likesCount--));
    }

    if (!this.isLiked) {
      this.likeService
        .likeAPost({
          userId: this.userId,
          likedUserUsername: this.username,
          postId: this.post.id,
          postOwnerId: this.post.userId
        })
        .subscribe(() => (this.isLiked = true, this.post.likesCount++));
    }
  }

  openPostSingleView() {
    this.matDialog.open(SinglePostViewComponent, {
      panelClass: ['w-[75vw]', 'h-[95vh]'],
      data: {
        post: this.post,
        postedUser: { username: 'jithux', DPURL: 'jithuz nne' },
      },
    });
  }
}

