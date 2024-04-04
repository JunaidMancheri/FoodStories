import { Route } from "@angular/router";

export const appRoutes : Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('@food-stories/admins-client/auth').then((comp) => comp.AuthComponent)
      }
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  }
]