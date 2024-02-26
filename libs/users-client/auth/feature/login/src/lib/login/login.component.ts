import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '@food-stories/users-client/auth/data-access';
import { NotificationService } from '@food-stories/users-client/auth/ui/services';
import { sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'fs-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,

  ) {}

  handleSubmit(form: NgForm) {
    if (form.valid) {
      const email = form.controls['email'].value;
      const password = form.controls['password'].value;
      this.authService.loginUser(email, password);
    } else {
      const emailErrors = form.controls['email'].errors;
      if (emailErrors) {
        if (emailErrors['required']) {
          this.notificationService.openSnackBar('Email is required');
        } else {
          this.notificationService.openSnackBar('Please enter a valid email');
        }
      }

      const passwordErrors = form.controls['password'].errors;
      if (passwordErrors) {
        if (passwordErrors['required']) {
          this.notificationService.openSnackBar('password is required');
        } else {
          this.notificationService.openSnackBar('Please provide a valid password');
        }
      }
    }
  }

  async loginWithGoogle() {
    this.authService.loginWithGoogle().catch(() =>  {
      this.notificationService.showSomethingWentWrong();
    })
  }

  async loginWithFacebook() {
    this.authService.loginWithFacebook().catch((error) => {
      if (error.code == 'auth/account-exists-with-different-credential') {
        this.notificationService.openSnackBar('This account is not linked with this provider');
    }
    })
  }


  async loginWithTwitter() {
    this.authService.loginWithTwitter().catch((error) => {
      if (error.code == 'auth/account-exists-with-different-credential') {
        this.notificationService.openSnackBar('This account is not linked with this provider');
    }
    })
  }

  startForgotPassword(form: NgForm) {
    const emailErrors = form.controls['email'].errors;
    if (emailErrors) {
      if (emailErrors['required']) {
        return this.notificationService.openSnackBar('Email is required');
      } else {
        return this.notificationService.openSnackBar('Please enter a valid email');
      }
    }
    this.authService.sendPasswordResetMail(form.controls['email'].value);
  }
}
