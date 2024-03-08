import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '@food-stories/common/typings';

@Component({
  selector: 'fs-posts-grid-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts-grid-item.component.html',
  styleUrls: ['./posts-grid-item.component.css'],
})
export class PostsGridItemComponent {
  @Input({required: true}) post!: IPost 
}
