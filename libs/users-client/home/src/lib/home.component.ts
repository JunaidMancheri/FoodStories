import { Component } from "@angular/core";
import { Auth } from '@angular/fire/auth'

@Component({
  selector: 'fs-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  constructor(private auth: Auth) {}

  logoutUser() {
    this.auth.signOut()
  }
}