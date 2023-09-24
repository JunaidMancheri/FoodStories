import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from '@angular/fire/auth';
import { AuthHttpService } from './http.service';
import { map } from 'rxjs';

interface UserData {
  email: string;
  password: string;
  username: string;
  DPURL?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: Auth, private router: Router,
    private httpService: AuthHttpService) {}


    isUsernameAvailable(username: string) {
      return this.httpService.checkUserNameAvailability(username)
      .pipe(map(response => response.available))
    }

  async registerWithEmailAndPassword(userData: UserData) {
    const user = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      userData.email,
      userData.password
    );

    await this.sendEmailVerification();
    userData.DPURL = user.user.photoURL;

    this.callBackendCreateUserEndPoint(userData);
  }

  async registerWithGoogle() {
    await signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
    this.router.navigateByUrl('/');
  }

  async registerWithTwitter(): Promise<string |  undefined> {
    await signInWithPopup(this.firebaseAuth, new TwitterAuthProvider());
    if (this.firebaseAuth.currentUser && !this.firebaseAuth.currentUser.emailVerified) {
      await this.sendEmailVerification();
      return 'An email verification link has been sent to your email. Please verify your email to continue';
    } else {
      this.router.navigateByUrl('/');
    }
    return;
  }

  async registerWithFacebook() {
    await signInWithPopup(this.firebaseAuth, new FacebookAuthProvider());
    if (this.firebaseAuth.currentUser && !this.firebaseAuth.currentUser.emailVerified) {
      await this.sendEmailVerification();
      return 'An email verification link has been sent to your email. Please verify your email to continue';
    } else {
      this.router.navigateByUrl('/');
    }
    return;
  }


  async sendEmailVerification() {
    if (this.firebaseAuth.currentUser) {
      await sendEmailVerification(this.firebaseAuth.currentUser, {
        url: 'http://localhost:4200/',
      });
    } else {
      throw new Error('Email verification mail failed');
    }
  }

  callBackendCreateUserEndPoint(userData: UserData) {
   this.httpService.createUser(userData)
   .subscribe(data => console.log(data));
  }
}

