import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
   isInitialLoading = true;
   constructor(private auth: Auth, private store : Store) {}
   ngOnInit(): void {
    setTimeout(() => {
      this.isInitialLoading = false;
    }, 1000)
  }

}
