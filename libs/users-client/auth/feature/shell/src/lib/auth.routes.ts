import { Route } from "@angular/router";
import { LoginComponent } from "../../../login/src/lib/login/login.component";
import { RegisterComponent } from "../../../register/src/lib/register/register.component";

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  }
]