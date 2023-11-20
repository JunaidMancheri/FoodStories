import { Auth } from "@angular/fire/auth";
import { Store } from "@ngrx/store";
import { AppActions } from "./app.actions";

export function appInitFactory(auth: Auth, store: Store) {
   return () => {
    auth.onAuthStateChanged((user) => {
      if  (user) {
        if(!user.email) auth.signOut()
        else {
          store.dispatch(AppActions.loadUserDetails({email: user.email}));
      }
      };
    })
   }
}
