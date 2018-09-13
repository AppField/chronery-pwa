import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginData, RegisterData } from '../../models/authenticate';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
