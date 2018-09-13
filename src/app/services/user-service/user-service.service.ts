import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  user: User;


  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user: User) => this.user = user);
  }

  async login(loginData: LoginData) {
    return this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  async register(registerData: RegisterData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(registerData.email, registerData.email);
  }
}
