import { Component } from "@angular/core";
import { Auth 
} from '@angular/fire/auth'
import { Router } from "@angular/router";

@Component({
  selector: 'fs-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {

  constructor(private auth: Auth, private router: Router) {}
  


}