/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route } from '@angular/router';
import { AuthGuard ,emailVerified } from '@angular/fire/auth-guard';
import { map, pipe } from 'rxjs'

const redirectLoggedInToHome = () => redirectVerifiedTo(['/']);
const redirectVerifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified &&  redirect || true));




const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['auth']);


export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: async () => (await import('@food-stories/users-client/home')).UsersClientHomeModule,
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToHome,
    },
    loadChildren: async () => (await import('@food-stories/users-client/auth/feature/shell')).AuthShellModule,
  }
];
