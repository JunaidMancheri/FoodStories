import { Route } from "@angular/router";
import { LayoutComponent } from '@food-stories/admins-client/layout';

export const appRoutes : Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('@food-stories/admins-client/auth').then((comp) => comp.AuthComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      }
    ],
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('@food-stories/admins-client/dashboard').then((comp) => comp.DashboardComponent)
    
      },
      {
        path: 'users',
        loadComponent: () => import('@food-stories/admins-client/users').then((comp) => comp.UsersComponent)
      }
    ]
  }
,
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  }
]