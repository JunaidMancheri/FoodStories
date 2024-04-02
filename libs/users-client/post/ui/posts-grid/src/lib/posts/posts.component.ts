import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsGridItemComponent } from '@food-stories/users-client/post/ui/posts-grid-item';
import { IPost, IUser } from '@food-stories/common/typings';
import { MatDialog } from '@angular/material/dialog';
import { SinglePostViewComponent } from '@food-stories/users-client/post/feature/single-post-view';

@Component({
  selector: 'fs-posts-grid',
  standalone: true,
  imports: [CommonModule, PostsGridItemComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnChanges {
  @Input({ required: true }) currUser!: IUser | null
  @Input({ required: true }) posts: IPost[] = [];
  private matDialog = inject(MatDialog);
  
  slicedPosts: IPost[][] = [[]];

  ngOnChanges(changes: SimpleChanges): void {
    if ('posts' in changes) {
      this.slicedPosts = this.convertTo2DArray();
    }
  }


  convertTo2DArray() {
    const result = [];
    for (let i = 0; i < this.posts.length; i += 3) {
      result.push(this.posts.slice(i, i + 3));
    }
    return result;
  }

  openPostSingleView(post: IPost) {
    this.matDialog.open(SinglePostViewComponent, {
      panelClass: ['w-[75vw]', 'h-[95vh]'],
      data: {
        post,
        postedUser: { username: this.currUser?.username, DPURL: this.currUser?.DPURL },
      },
    });
  }
}
