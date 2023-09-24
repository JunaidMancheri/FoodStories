import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '@food-stories/users-client/auth/ui/dialog-box';
import { UsernameDialogInputComponent } from '@food-stories/users-client/auth/ui/username-dialog-input';
import { AuthService } from '@food-stories/users-client/auth/data-access'
import { Subscription } from 'rxjs';

interface userData {
  email: string;
  password: string;
  username: string;
  DPURL?: string | null;
}

type CallbackFunction = () => void;

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  isLoading = false;
  username: string | null = null;
  subscription: Subscription | undefined;


  constructor(
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private authService: AuthService
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
          this.openSnackBar('username is required');
          return;
        }

        if (usernameErrors['usernameTaken']) {
          this.openSnackBar('The username is already taken. Please find a new one');
          return;
        }

     
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

    
  }

  openSnackBar(message: string) {
    new Audio().play();
    this._snackBar.open(message, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
    });
  }

  openDialogBox(content: string) {
    this._dialog.open(DialogBoxComponent, {
      panelClass: 'md-dialog',
      data: {
        title: 'Email Verification',
        content,
      },
    });
  }

  openUsernameInputDialogBox(callback: CallbackFunction) {
    const dialogRef =this._dialog.open(UsernameDialogInputComponent);

    dialogRef.afterClosed()
    .subscribe((username) => {
      if (username) {
        this.subscription = this.authService.isUsernameAvailable(username).subscribe((isAvailable) => {
          console.log(isAvailable);
          if (isAvailable) {
            this.username = username;
            callback()
          } else {
            this.openSnackBar('Oops.. That username is already taken');
          }
        })
      }
    });
  }

  registerWithFacebook() {
    const callback: CallbackFunction = () => {
      this.authService.registerWithFacebook()
      .then((infos) => {
        if (infos) {
          this.openDialogBox(infos);
        }
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential':
            this.openSnackBar('Account exists with different credentials')
        }
      })
    }
    this.openUsernameInputDialogBox(callback);
  }

  async registerWithTwitter() {
    const callback: CallbackFunction = () => {
      this.authService.registerWithTwitter()
      .then((infos) => {
        if (infos) {
          this.openDialogBox(infos);
        }
      })
      .catch((error) => {
        switch(error.code) {
          case 'auth/account-exists-with-different-credential':
            this.openSnackBar('Account exists with different credentials')
        }
      })
    }
    this.openUsernameInputDialogBox(callback);
  }



  registerWithGoogle() {
    const callback: CallbackFunction = () => {
      this.authService.registerWithGoogle()
      .catch((error) => {
        this.openDialogBox(error)
      })
    }
    this.openUsernameInputDialogBox(callback);
  }



  async registerWithEmailAndPassword(userData: userData) {
    this.authService.registerWithEmailAndPassword(userData)
    .then(() => {
      this.openDialogBox(' A Verification link has been sent to your email. Please verify your email to continue.');
    })
    .catch((error) => {
      if (error.code == 'auth/email-already-in-use') {
        this.openSnackBar('Email already in use');
      } else if(error.code == 'auth/invalid-email') {
        this.openSnackBar('Please provide a valid email address');
      } else {
        this.openSnackBar('Something went wrong ... Please try again later');
      }
    })
  }
}
