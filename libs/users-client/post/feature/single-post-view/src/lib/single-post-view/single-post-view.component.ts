import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { IPost } from '@food-stories/common/typings';

@Component({
  selector: 'fs-single-post-view',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css'],
})
export class SinglePostViewComponent {
  data: {post: IPost, postUser: {DPURL: string, username: string}} = inject(MAT_DIALOG_DATA);
}
