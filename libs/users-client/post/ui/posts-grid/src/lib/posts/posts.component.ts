import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsGridItemComponent } from '@food-stories/users-client/post/ui/posts-grid-item';
import { IPost } from '@food-stories/common/typings';

@Component({
  selector: 'fs-posts',
  standalone: true,
  imports: [CommonModule, PostsGridItemComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if ('posts' in changes) {
      this.slicedPosts = this.convertTo2DArray();
    }
  }
  @Input({required: true}) posts : IPost[] = []
  
  slicedPosts: IPost[][] = [[]]

   convertTo2DArray() {
    const result = [];
    for (let i = 0; i < this.posts.length; i += 3) {
        result.push(this.posts.slice(i, i + 3));
    }
    return result;
}
}
