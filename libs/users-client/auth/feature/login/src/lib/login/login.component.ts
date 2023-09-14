import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth, sendEmailVerification, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@food-stories/users-client/auth/ui/dialog-box';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private auth: Auth,
    private _dialog: MatDialog,
    private cookie: CookieService
  ) {}

  handleSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.controls['email'].value;
      const password = form.controls['password'].value;
      this.loginUser(email, password);
    } else {
      const emailErrors = form.controls['email'].errors;
      if (emailErrors) {
        if (emailErrors['required']) {
          this.openSnackBar('Email is required');
        } else {
          this.openSnackBar('Please enter a valid email');
        }
      }

      const passwordErrors = form.controls['password'].errors;
      if (passwordErrors) {
        if (passwordErrors['required']) {
          this.openSnackBar('password is required');
        } else {
          this.openSnackBar('Please provide a valid password');
        }
      }
    }
  }

  loginUser(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then( async (user) => {
        if (!user.user.emailVerified) {
          this.openDialog('Your email hasn\'t been verified yet. Please verify your email to continue. We have sent a verification link to your email');
          if (this.auth.currentUser) {
            sendEmailVerification(this.auth.currentUser).then(() => {
              this.openSnackBar('Verification email has been sent');
            }).catch(() => {
              this.openSnackBar('There is trouble sending the mail now. Please try again later');
            } )
          }
          else this.openDialog('Something went wrong. Please try again later');
        } else {
          this.persistAuthState(await user.user.getIdToken(),user.user.refreshToken)
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/user-not-found') {
          this.openSnackBar('No user found with this email');
        } else if (error.code == 'auth/wrong-password') {
          this.openSnackBar('Wrong password or email');
        } else if (error.code == 'auth/too-many-requests') {
          this.openDialog('Your account has been  temporarily disabled due to too many attempts with wrong password. Either reset your  password or try again later ;)');
        }
      });
  }
  
  persistAuthState(accessToken: string, refreshToken: string) {
    this.cookie.set('refresh_token', refreshToken);
    this.cookie.set('access_token', accessToken);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  openDialog(content: string) {
    this._dialog.open(DialogBoxComponent, {
      data: {
        title: 'Warning',
        content,
      },
    });
  }
}
