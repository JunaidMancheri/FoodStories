import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { loadUserDetails} from './store/app.actions';

@Component({
  selector: 'fs-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

   title = 'users-client'
   isInitialLoading = true;

   constructor(private auth: Auth, private store : Store) {}


   ngOnInit(): void {
    setTimeout(() => {
      this.isInitialLoading = false;
    }, 1000)
    

    this.auth.onAuthStateChanged((user) => {
      if  (user) {
        if(!user.email) this.auth.signOut()
        else {
          this.store.dispatch(loadUserDetails({email: user.email}));
      }
      } else {
        console.log('notFetching')
      }
    })
  }

}
