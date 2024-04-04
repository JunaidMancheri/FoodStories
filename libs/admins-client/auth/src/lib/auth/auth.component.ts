import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'fs-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(
    private firebaseAuth: Auth,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onLoginSubmit(form: NgForm) {
    signInWithEmailAndPassword(
      this.firebaseAuth,
      form.value['email'],
      form.value['password']
    )
      .then((userCred) => {
        userCred.user.getIdTokenResult().then((token) => {
          if (token.claims['admin']) {
            this.router.navigateByUrl('/dashboard');
          } else {
            this.snackBar.open('Not a admin', 'close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            })
          }
        });
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          this.snackBar.open('Invalid credentials', 'close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }
}
