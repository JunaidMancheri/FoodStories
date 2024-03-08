import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { CreatePostDialogComponent } from '@food-stories/users-client/post/feature/create-post'
import { Store } from '@ngrx/store';
import { selectCurrentUserIdOrUsername } from '@food-stories/users-client/shared/app-init';
import { map } from 'rxjs';
import { SearchBoxComponent } from '@food-stories/users-client/search/feature';
import { MatSidenavModule  } from '@angular/material/sidenav';
@Component({
  selector: 'fs-sidebar-layout',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, MatDialogModule, MatSidenavModule, SearchBoxComponent],
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.css'],
})
export class SidebarLayoutComponent {

  constructor(private matDialog: MatDialog, private store: Store) {}
  
  idOrUsername$ = this.store.select(selectCurrentUserIdOrUsername);
  
  get profilePageLink() {
    return this.idOrUsername$.pipe(map(idOrUsername => `/${idOrUsername.username}`))
  }

  openCreateNewPostDialogBox() {
    this.matDialog.open(CreatePostDialogComponent, {panelClass: ''})
  }
}
