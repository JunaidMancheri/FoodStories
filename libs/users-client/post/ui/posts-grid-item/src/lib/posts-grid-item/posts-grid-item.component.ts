import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '@food-stories/common/typings';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fs-posts-grid-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './posts-grid-item.component.html',
  styleUrls: ['./posts-grid-item.component.css'],
})
export class PostsGridItemComponent {
  @Input({required: true}) post!: IPost 
}
