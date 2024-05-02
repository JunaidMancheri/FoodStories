import { Component, OnInit, inject } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IUser } from '@food-stories/common/typings';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'fs-admin-users',
  styleUrls: ['users.component.css'],
  templateUrl: 'users.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
  standalone: true,
  imports: [
    MatTableModule,
    NgFor,
    MatButtonModule,
    NgIf,
    MatIconModule,
    HttpClientModule,
    DatePipe,
    MatSlideToggleModule,
    MatPaginatorModule,
  ],
})
export class UsersComponent implements OnInit {
  dataSource: IUser[] = [];
  columnsToDisplay = ['username', 'email', 'id', 'createdAt', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: IUser | null;
  count = 0;



  http = inject(HttpClient);

  ngOnInit(): void {
    this.http
      .get<{ users: IUser[] , count: number}>('https://app.foodstories.fun/api/v1/users', {params: {page: 0, size: 25}})
      .subscribe((results) => {
        this.count =  results.count
        this.dataSource = results.users;
      });
  }

  handlePageEvent(e: PageEvent) {
    this.http
    .get<{ users: IUser[] }>('https://app.foodstories.fun/api/v1/users', {params: {page: e.pageIndex, size: e.pageSize}})
    .subscribe((results) => {
      this.dataSource = results.users;
    });

  }
}
