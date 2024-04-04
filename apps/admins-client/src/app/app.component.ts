import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
@Component({
  standalone: true,
  imports: [RouterModule, MatSidenavModule, MatIconModule],
  selector: 'fs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
