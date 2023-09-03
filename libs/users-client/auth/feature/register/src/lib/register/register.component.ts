import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Auth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth'
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage: string | null = null;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private googleAuthProvider : GoogleAuthProvider,
    private facebookAuthProvider: FacebookAuthProvider,
    private twitterAuthProvider: TwitterAuthProvider,
    private auth: Auth,
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.matIconRegistry.addSvgIcon('google', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
  }



  handleSubmit(form: NgForm) {
    if (form.valid) {
      alert('yeh');
    }
    else {
        
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

}

   openSnackBar(message: string) {
    (new Audio()).play();
    this._snackBar.open(message, 'close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
    })
   }

  registerWithEmailAndPassword() {

    signInWithEmailAndPassword(this.auth, 'junaidofficialnow@gmail.com', 'jithu@123').then((user)=> {
      this.httpClient.post('http://localhost:3000/api/v1/users', {name: user.user.displayName, userName: user.user.displayName,
     DPURL: user.user.photoURL, email: user.user.email}).subscribe((data: any) => console.log(data)) 
      console.log(user);
    })
  }


  registerWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider).then((user) => {
      const credential = GoogleAuthProvider.credentialFromResult(user);
      const token = credential?.accessToken
      console.log(credential);

    })

  }

  registerWithFacebook() {
    signInWithPopup(this.auth, this.facebookAuthProvider)
  }

  registerWithTwitter() {
    signInWithPopup(this.auth, this.twitterAuthProvider);
  }
}
