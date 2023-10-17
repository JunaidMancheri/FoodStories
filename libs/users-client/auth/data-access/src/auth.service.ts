import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';
import { AuthHttpService } from './http.service';
import { map, firstValueFrom } from 'rxjs';
import { NotificationService } from '@food-stories/users-client/auth/ui/services';
import { environment } from '@food-stories/users-client/shared/config';

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
  constructor(
    private firebaseAuth: Auth,
    private router: Router,
    private httpService: AuthHttpService,
    private notificiationService: NotificationService,
  ) {}

  isUsernameAvailable(username: string) {
    return this.httpService
      .checkUserNameAvailability(username)
      .pipe(map((response) => response.available));
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

 isEmailUsed(email: string) {
    return this.httpService.isRegisteredUser(email).pipe(
      map((registered) => {
        if (registered) {
          throw new Error('The Email is already in use');
        }
      })
    );
  }

  async registerWithGoogle(username: string) {
    const user = await signInWithPopup(
      this.firebaseAuth,
      new GoogleAuthProvider()
    );
    if (!user.user.email){
      return this.notificiationService.showSomethingWentWrong();
    }
    try {
      (await firstValueFrom(this.isEmailUsed(user.user.email)))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.firebaseAuth.signOut();
      this.notificiationService.openDialog(error.message)
      return;
    }
    
    const userData: createUserDto = {
      email: user.user.email,
      DPURL: user.user.photoURL,
      username,
    };
    this.callBackendCreateUserEndPoint(userData);
    this.router.navigateByUrl('/');
  }

  async registerWithTwitter(username: string) {
    const user = await signInWithPopup(
      this.firebaseAuth,
      new TwitterAuthProvider()
    );
    if (!user.user.email){
      return this.notificiationService.showSomethingWentWrong();
    }
    try {
      (await firstValueFrom(this.isEmailUsed(user.user.email)))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.firebaseAuth.signOut();
      this.notificiationService.openDialog(error.message)
      return;
    }
    const userData: createUserDto = {
      username,
      email: user.user.email,
      DPURL: user.user.photoURL,
    };
    this.callBackendCreateUserEndPoint(userData);
    if (
      this.firebaseAuth.currentUser &&
      !this.firebaseAuth.currentUser.emailVerified
    ) {
      await this.sendEmailVerification();
      this.notificiationService.openDialog('An email verification link has been sent to your email. Please verify your email to continue')
    } else {
      this.router.navigateByUrl('/');
    }
  }

  async registerWithFacebook(username: string) {
    const user = await signInWithPopup(
      this.firebaseAuth,
      new FacebookAuthProvider()
    );

    if (!user.user.email){
      return this.notificiationService.showSomethingWentWrong();
    }
    try {
      (await firstValueFrom(this.isEmailUsed(user.user.email)))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.firebaseAuth.signOut();
      this.notificiationService.openDialog(error.message)
      return;
    }
    const userData: createUserDto = {
      username,
      email: user.user.email,
      DPURL: user.user.photoURL,
    };
    this.callBackendCreateUserEndPoint(userData);
    if (
      this.firebaseAuth.currentUser &&
      !this.firebaseAuth.currentUser.emailVerified
    ) {
      await this.sendEmailVerification();
      this.notificiationService.openDialog('An email verification link has been sent to your email. Please verify your email to continue')
    } else {
      this.router.navigateByUrl('/');
    }
  }

  async sendEmailVerification() {
    if (this.firebaseAuth.currentUser) {
      await sendEmailVerification(this.firebaseAuth.currentUser, {
        url: environment.homeUrl,
      });
    } else {
      this.notificiationService.openDialog('There was a error sending the email now. Please try again later');
    }
  }

  callBackendCreateUserEndPoint(userData: createUserDto) {
    this.httpService
      .createUser(userData)
      .subscribe();
  }

  
  loginUser(email: string, password: string) {
    signInWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(async (user) => {
        if (!user.user.emailVerified) {
          this.notificiationService.openDialog(
            "Your email hasn't been verified yet. Please verify your email to continue. We have sent a verification link to your email"
          );
          await this.sendEmailVerification();
          this.notificiationService.openSnackBar('Verification email has been sent');
        } else {
          this.router.navigate(['/']);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code == 'auth/user-not-found') {
          this.notificiationService.openSnackBar('No user found with this email');
        } else if (error.code == 'auth/wrong-password') {
          this.notificiationService.openSnackBar('Wrong password or email');
        } else if (error.code == 'auth/too-many-requests') {
          this.notificiationService.openSnackBar(
            'Your account has been  temporarily disabled due to too many attempts with wrong password. Either reset your  password or try again later ;)'
          );
        } else {
          this.notificiationService.openSnackBar('Something went wrong. Please try again later');
        }
      });
  }

  async loginWithGoogle() {
    const userCredential = await  signInWithPopup(this.firebaseAuth, new GoogleAuthProvider());
    if (!userCredential.user.email) {
      return this.notificiationService.openSnackBar('Something went wrong. Please try again later');
    }
    this.httpService.isRegisteredUser(userCredential.user.email).subscribe((registered) => {
       if (registered) {
        this.router.navigateByUrl('/');
       } else {
        if (this.firebaseAuth.currentUser) {
           deleteUser(this.firebaseAuth.currentUser);
        }
        this.notificiationService.openSnackBar('Please register before login');
       }
    })
  
  }

  async loginWithFacebook() {
      const userCredential = await signInWithPopup(this.firebaseAuth, new FacebookAuthProvider());

      if (!userCredential.user.email) {
        return this.notificiationService.showSomethingWentWrong();
      }
      this.httpService.isRegisteredUser(userCredential.user.email).subscribe((registered) => {
         if (registered) {
          if (!this.firebaseAuth.currentUser?.emailVerified) {
            this.notificiationService.openDialog('This email is not yet verified. Please verify to continue. We have sent a verification link to your mail');
          } else {
            this.router.navigateByUrl('/');
          }
         } else {
          if (this.firebaseAuth.currentUser) {
             deleteUser(this.firebaseAuth.currentUser);
          }
          this.notificiationService.openSnackBar('Please register before login');
         }
      })
    }



    async loginWithTwitter() {
      const userCredential = await signInWithPopup(this.firebaseAuth, new TwitterAuthProvider());

      if (!userCredential.user.email) {
        return this.notificiationService.showSomethingWentWrong();
      }
      this.httpService.isRegisteredUser(userCredential.user.email).subscribe((registered) => {
         if (registered) {
          if (!this.firebaseAuth.currentUser?.emailVerified) {
            this.notificiationService.openDialog('This email is not yet verified. Please verify to continue. We have sent a verification link to your mail');
          } else {
            this.router.navigateByUrl('/');
          }
         } else {
          if (this.firebaseAuth.currentUser) {
             deleteUser(this.firebaseAuth.currentUser);
          }
          this.notificiationService.openSnackBar('Please register before login');
         }
      })
    }
}

export interface createUserDto {
  email: string | null;
  DPURL?: string | null;
  username: string;
}
