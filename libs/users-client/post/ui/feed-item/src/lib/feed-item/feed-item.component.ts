import { Component , Input, OnInit, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { IPost } from '@food-stories/common/typings';
import { RelativePipeModule } from '@food-stories/users-client/shared/utils';
import { LikesService } from '@food-stories/users-client/post/data-access';
@Component({
  selector: 'fs-feed-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, RelativePipeModule],
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.css'],
})
export class FeedItemComponent implements OnInit {
  @Input({required: true}) post!: IPost
  @Input({required: true}) userId!: string;
  @Input({required: true}) username!: string;
  isLiked!: boolean

  likeService  = inject(LikesService);

  

  ngOnInit(): void {
    this
      this.likeService.isPostLiked(this.post.id, this.userId).subscribe((res) => {
        console.log(res);
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
}

