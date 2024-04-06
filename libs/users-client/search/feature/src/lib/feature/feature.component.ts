import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '@food-stories/users-client/shared/config';

@Component({
  selector: 'fs-search-box',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css'],
})
export class SearchBoxComponent implements OnInit {

  @Output() closeDrawer = new EventEmitter<void>()
  searchControl = new FormControl('');
  router = inject(Router);

  http = inject(HttpClient);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[] = [];


  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((value) => value !== ''),
      distinctUntilChanged(),
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      switchMap((query) => this.searchUser(query!))
    ).subscribe((results) => {
       this.results = results.results;
    })
  }

  private searchUser(query: string) {
    return  this.http.get<{results:{username:string, name: string, DPURL:  string}[]}>(API_ENDPOINTS.Users.searchUsers(), {params: {query}});
  }

  onResultClick(username: string) {
    this.closeDrawer.emit();
   this.router.navigateByUrl(`/${username}`);
  }


}
