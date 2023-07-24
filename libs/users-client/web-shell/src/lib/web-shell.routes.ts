import { Route } from '@angular/router';
import { isAuthorizedGuard } from '@food-stories/users-client/shared/utils'

export const appRoutes: Route[] = [
  {
    path: '',
    canActivate: [isAuthorizedGuard],
    loadChildren: async () => (await import('@food-stories/users-client/home')).UsersClientHomeModule,
  },
  {
    path: 'auth',
    loadChildren: async () => (await import('@food-stories/users-client/auth/feature/shell')).AuthShellModule,
  }
];
