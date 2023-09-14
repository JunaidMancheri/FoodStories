import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { Auth } from '@angular/fire/auth'
export const isAuthorizedGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const router = inject(Router);
  const auth = inject(Auth)
  console.log(auth.currentUser);
  if (auth.currentUser && auth.currentUser.emailVerified) {
    return true;
  } 
  router.navigate(['auth', 'login']);
  return false;
}