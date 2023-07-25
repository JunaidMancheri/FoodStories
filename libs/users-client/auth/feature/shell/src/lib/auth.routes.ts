import { Route } from "@angular/router";
import { LoginComponent } from "@food-stories/users-client/auth/feature/login";
import { RegisterComponent } from "@food-stories/users-client/auth/feature/register";
import { AuthLayoutComponent } from "@food-stories/users-client/auth/ui/layout";

export const authRoutes: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },

    ]
  }
]