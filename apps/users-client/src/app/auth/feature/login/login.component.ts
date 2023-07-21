import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {}