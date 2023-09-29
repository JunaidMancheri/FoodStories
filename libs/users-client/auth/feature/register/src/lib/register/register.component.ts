import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsernameDialogInputComponent } from '@food-stories/users-client/auth/ui/username-dialog-input';
import { AuthService } from '@food-stories/users-client/auth/data-access'
import { Subscription } from 'rxjs';
import { NotificationService } from '@food-stories/users-client/auth/ui/services';

interface userData {
  email: string;
  password: string;
  username: string;
  DPURL?: string | null;
}

type CallbackFunction = (username: string) => void;

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  isLoading = false;
  subscription: Subscription | undefined;


  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async handleSubmit(form: NgForm) {
    this.isLoading = true;
    setTimeout(() => (this.isLoading = false), 1000);
    if (form.valid) {
      const userData = {
        email: form.controls['email'].value as string,
        password: form.controls['password'].value as string,
        username: form.controls['username'].value as string,
      };
      this.registerWithEmailAndPassword(userData);
      
    } else {

      const usernameErrors = form.controls['username'].errors;
      if (usernameErrors) {
        
        if (usernameErrors['required']) {
          this.notificationService.openSnackBar('username is required');
          return;
        }

        if (usernameErrors['usernameTaken']) {
          this.notificationService.openSnackBar('The username is already taken. Please find a new one');
          return;
        }

     
      }
      const emailErrors = form.controls['email'].errors;
      if (emailErrors && emailErrors['required']) {
        this.notificationService.openSnackBar('email is required');
        return;
      }

      const passwordErrors = form.controls['password'].errors;

      if (passwordErrors && passwordErrors['required']) {
        this.notificationService.openSnackBar('password is required');
        return;
      }

      const formErrors = form.errors;
      if (formErrors && formErrors['isPasswordsDoNotMatch']) {
        this.notificationService.openSnackBar('Passwords do not match');
        return;
      }

      this.notificationService.openSnackBar('Invalid form inputs');
    }

    
  }

  openUsernameInputDialogBox(callback: CallbackFunction) {
    const dialogRef =this.dialog.open(UsernameDialogInputComponent);

    dialogRef.afterClosed()
    .subscribe((username) => {
      if (username) {
        this.subscription = this.authService.isUsernameAvailable(username).subscribe((isAvailable) => {
          console.log(isAvailable);
          if (isAvailable) {
            callback(username)
          } else {
            this.notificationService.openSnackBar('Oops.. That username is already taken');
          }
        })
      }
    });
  }

  registerWithFacebook() {
    const callback: CallbackFunction = (username: string) => {
      this.authService.registerWithFacebook(username)
      .catch((error) => {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential':
            this.notificationService.openSnackBar('Account exists with different credentials')
        }
      })
    }
    this.openUsernameInputDialogBox(callback);
  }

  async registerWithTwitter() {
    const callback: CallbackFunction = (username: string) => {
      this.authService.registerWithTwitter(username)
      .catch((error) => {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential':
            this.notificationService.openSnackBar('Account exists with different credentials')
        }
      })
    }
    this.openUsernameInputDialogBox(callback);
  }



  registerWithGoogle() {
    const callback: CallbackFunction = (username: string) => {
      this.authService.registerWithGoogle(username)
      .catch((error) => {
        this.notificationService.openDialog(error)
      })
    }
    this.openUsernameInputDialogBox(callback);
  }



  async registerWithEmailAndPassword(userData: userData) {
    this.authService.registerWithEmailAndPassword(userData)
    .then(() => {
      this.notificationService.openDialog(' A Verification link has been sent to your email. Please verify your email to continue.');
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        this.notificationService.openSnackBar('Email already in use');
      } else if(error.code == 'auth/invalid-email') {
        this.notificationService.openSnackBar('Please provide a valid email address');
      } else {
        this.notificationService.showSomethingWentWrong();
      }
    })
  }
}
