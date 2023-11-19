import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IUser } from '@food-stories/common/typings'

@Component({
  selector: 'fs-bio-section',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './bio-section.component.html',
  styleUrls: ['./bio-section.component.css'],
})
export class BioSectionComponent {
  constructor(private auth: Auth, private router: Router) {}

  @Input({required: true}) currentUser!: IUser | null;
  @Input({required: true}) isOwnProfile!: boolean | null;

  logoutUser() {
    this.auth.signOut()
    this.router.navigateByUrl('/auth')
  }
}
