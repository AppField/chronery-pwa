import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { ToastController } from '@ionic/angular';

interface User {
  uid: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  readDataProtection?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    // Get auth data, then get firestore user document
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      // tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    );
  }

  // ======== OAuth Methods ======== //

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  private async oAuthLogin(provider) {
    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      console.log('credentials', credential);
      this.updateUserData(credential.user);
      return true;

    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  // ======== Find Sign In Methods for E-Mail ======== //
  async emailSignInMethods(email: string) {
    try {
      const methods = await this.afAuth.auth.fetchSignInMethodsForEmail(email);
      console.log('SIGN IN METHODS', methods);
      return methods;
    } catch (error) {
      this.handleError(error);
    }
  }

  // ======== E-Mail/Password Auth ======== //

  async emailSignUp(email: string, password: string, firstName: string, lastName: string, readDataProtection: boolean) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log('credentials', credential);
      await this.updateUserData(credential.user, firstName, lastName, readDataProtection);
      this.sendVerificationMail();
      return true;

    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  async emailLogin(email: string, password: string) {
    try {
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log('credentials', credential);
      this.updateUserData(credential.user);
      return true;

    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  // ======== Send a verification Link to an email======== //

  async sendVerificationMail() {
    const user = this.afAuth.auth.currentUser;
    try {
      await user.sendEmailVerification();
      const toast = await this.toastCtrl.create({
        message: 'Ihnen wurde eine E-Mail mit einem Link zugesendet. Bitte betätigen Sie diesen Link, um Ihre E-Mail Adresse zu bestätigen',
        duration: 10000,
        showCloseButton: true,
        position: 'middle',
        closeButtonText: 'OK'
      });
      toast.present();
      return true;
    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  // ======== Sends email to reset password ======== //
  async resetPassword(email: string) {
    try {
      const fbAuth = auth();
      return await fbAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this.handleError(error);
      return false;
    }
  }

  // ======== Sets user data to firestore after successful login ======== //

  private updateUserData(user, firstName?: string, lastName?: string, readDataProtection?: boolean) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`user/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    if (firstName) {
      data.firstName = firstName;
      data.displayName = firstName;
    }
    if (lastName) {
      data.lastName = lastName;
      data.displayName += ` ${lastName}`;
    }

    if (readDataProtection) {
      data.readDataProtection = readDataProtection;
    }
    console.log('user to update', data);

    return userRef.set(data, { merge: true });
  }

  // ======== Utility======== //

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  private async handleError(error) {
    console.log('error occured', error);
    let message = 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut';
    switch (error.code) {
      case 'auth/wrong-password':
        message = 'Bitte überprüfen Sie die eingegebene E-Mail Adresse und das Passwort.';
        break;
    }

    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000,
      showCloseButton: true,
      position: 'middle',
      closeButtonText: 'OK'
    });
    toast.present();
  }
}
