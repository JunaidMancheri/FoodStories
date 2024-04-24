import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'fs-layout',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  auth = inject(Auth)
  router = inject(Router)
  logout() {
   this.auth.signOut();
   this.router.navigateByUrl('/auth');
  }
}
