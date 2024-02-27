import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon, MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { IPost } from '@food-stories/common/typings';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store'
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init'

@Component({
  selector: 'fs-single-post-view',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatDividerModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './single-post-view.component.html',
  styleUrls: ['./single-post-view.component.css'],
})
export class SinglePostViewComponent implements OnInit {
  http = inject(HttpClient);
  store = inject(Store)


  ngOnInit(): void {

     this.store.select(selectCurrentUserIdOrUsername).subscribe((data) => {
      this.userId = data.id;
      this.http.get<{isLiked: boolean}>('http://localhost:3000/api/v1/likes/liked/'+ this.data.post.id, {params: {userId: this.userId}} ).subscribe((response) => {
        console.log(response);
        this.isLiked = response.isLiked;
       })
     })
 
  }
  userId = '';
  data: {post: IPost, postUser: {DPURL: string, username: string}} = inject(MAT_DIALOG_DATA);
  isLiked = false;

  toggleLike(matIcon: MatIcon) {
     if (this.isLiked) {
      this.http.delete('http://localhost:3000/api/v1/likes/' + this.data.post.id, {body: {userId: this.userId}}).subscribe(() => this.isLiked = false)
     }

     if (!this.isLiked) {
      this.http.post('http://localhost:3000/api/v1/likes/' + this.data.post.id, {userId: this.userId}).subscribe(() => this.isLiked = true)
     }
    
    const icon = matIcon._elementRef.nativeElement as HTMLElement;
    icon.classList.add('animate-icon-click')
    setTimeout(() => {
      icon.classList.remove('animate-icon-click');
    }, 500)
  }
}
