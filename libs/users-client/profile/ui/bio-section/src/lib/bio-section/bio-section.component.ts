import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'fs-bio-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './bio-section.component.html',
  styleUrls: ['./bio-section.component.css'],
})
export class BioSectionComponent {
  constructor(private auth: Auth, private router: Router) {}
  logoutUser() {
    this.auth.signOut()
    this.router.navigateByUrl('/auth')
  }
}
