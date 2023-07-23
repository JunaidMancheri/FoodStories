import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () => (await import('@food-stories/users-client/home')).UsersClientHomeModule,
  },
];
