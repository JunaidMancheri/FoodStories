import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Auth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword} from '@angular/fire/auth'

@Component({
  selector: 'fs-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private googleAuthProvider : GoogleAuthProvider,
    private facebookAuthProvider: FacebookAuthProvider,
    private twitterAuthProvider: TwitterAuthProvider,
    private auth: Auth
  ) {
    this.matIconRegistry.addSvgIcon('google', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/google.svg'));
  }

  registerWithEmailAndPassword() {
    signInWithEmailAndPassword(this.auth, 'junaidofficialnow@gmail.com', 'ithu@123').then((user)=> {
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
