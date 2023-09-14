import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@food-stories/users-client/auth/ui/dialog-box';

interface userData {
  email: string;
  password: string;
  userName: string;
  emailVerified?: boolean;
  DPURL?: string | null;
}

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isLoading = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private googleAuthProvider: GoogleAuthProvider,
    private facebookAuthProvider: FacebookAuthProvider,
    private twitterAuthProvider: TwitterAuthProvider,
    private auth: Auth,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService,
    private _dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/google.svg')
    );
  }

  async handleSubmit(form: NgForm) {
    this.isLoading = true;
    if (form.valid) {
      const userData = {
        email: form.controls['email'].value as string,
        password: form.controls['password'].value as string,
        userName: form.controls['username'].value as string,
      };
      await this.registerWithEmailAndPassword(userData);
    } else {
      const usernameErrors = form.controls['username'].errors;
      if (usernameErrors && usernameErrors['required']) {
        this.openSnackBar('username is required');
        return;
      }

      const emailErrors = form.controls['email'].errors;
      if (emailErrors && emailErrors['required']) {
        this.openSnackBar('email is required');
        return;
      }

      const passwordErrors = form.controls['password'].errors;

      if (passwordErrors && passwordErrors['required']) {
        this.openSnackBar('password is required');
        return;
      }

      const formErrors = form.errors;
      if (formErrors && formErrors['isPasswordsDoNotMatch']) {
        this.openSnackBar('Passwords do not match');
        return;
      }

      this.openSnackBar('Invalid form inputs');
    }

    setTimeout(() => (this.isLoading = false), 1000);
  }

  openSnackBar(message: string) {
    new Audio().play();
    this._snackBar.open(message, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
    });
  }

  openDialogBox() {
    this._dialog.open(DialogBoxComponent, {
      panelClass: 'md-dialog',
      data: {
        title: 'Email Verification',
        content:
          ' A Verification link has been sent to your email. Please verify your email to continue.',
      },
    });
  }

  async registerWithEmailAndPassword(userData: userData) {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then(async (user) => {
        if (this.auth.currentUser) {
          sendEmailVerification(this.auth.currentUser, {
            url: 'http://localhost:4200/auth/login?emailVerified=true',
          }).then(() => {
            this.openDialogBox();
          });
          userData.DPURL = user.user.photoURL;
          userData.emailVerified = user.user.emailVerified;
          this.callBackendCreateUserEndPoint(userData);
          const token = await user.user.getIdToken();
          this.persistAuthState(token, user.user.refreshToken);
        } else {
          this.openSnackBar('Something went wrong, Please try again later');
        }
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          this.openSnackBar('Email already in use');
        }
      });
  }

  persistAuthState(accessToken: string, refreshToken: string) {
    this.cookieService.set('access_token', accessToken);
    this.cookieService.set('refresh_token', refreshToken);
  }

  callBackendCreateUserEndPoint(userData: userData) {
    this.httpClient
      .post('http://localhost:3000/api/v1/users', {
        userName: userData.userName,
        DPURL: 'hlo how are you',
        email: userData.email,
        emailVerified: userData.emailVerified,
      })
      .subscribe((data: any) => console.log(data, 5));
  }
}
