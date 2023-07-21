import { Route } from "@angular/router";
import { LoginComponent } from "../feature/login/login.component";
import { RegisterComponent } from "../feature/register/register.component";

export const authRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent

  }

  
]