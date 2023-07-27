import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

   title = 'users-client'
   isInitialLoading = false;


   ngOnInit(): void {
    setTimeout(() => {
      this.isInitialLoading = false;
    }, 1000)
  }

}
