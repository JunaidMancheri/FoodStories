/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route } from '@angular/router';
import { AuthGuard ,emailVerified } from '@angular/fire/auth-guard';
import { map, pipe } from 'rxjs'
import { SidebarLayoutComponent } from '@food-stories/users-client/shared/ui/sidebar-layout'

const redirectLoggedInToHome = () => redirectVerifiedTo(['/']);
const redirectVerifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified &&  redirect || true));




const redirectUnverifiedTo = (redirect: any[]) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectUnauthorizedToLogin = () => redirectUnverifiedTo(['auth']);


export const appRoutes: Route[] = [
  {
    path: 'auth',
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToHome,
    },
    loadChildren: async () => (await import('@food-stories/users-client/auth/feature/shell')).AuthShellModule,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: SidebarLayoutComponent,
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@food-stories/users-client/feed/feature')).FeedModule,
      },
      {
        path: ':username',
        loadChildren: async () => (await import('@food-stories/users-client/profile/feature')).ProfileModule,
      }


    ],
  }
];
