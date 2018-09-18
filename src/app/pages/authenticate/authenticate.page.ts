import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from '../../utils/custom-validators';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'chy-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toastCtrl: ToastController,
              private router: Router) {
  }

  ngOnInit() {
    // setup login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // setup register Form
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: [''],
      lastName: [''],
      password: ['', Validators.required],
      repeatPassword: ['', [Validators.required, matchPasswordValidator]]
    });
  }

  async loginWithGoogle() {
    const loggedin = await this.auth.googleLogin();
    // this.router.navigate(['/dashboard']);
    console.log('Logged in with Google', loggedin);
    if (loggedin) {
      this.handleLogin();
    }
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      let loggedin = null;
      try {
        loggedin = await this.auth.emailLogin(email, password);
      } catch (error) {
        this.handleError(error);
      }
      this.isLoading = false;
      if (loggedin) {
        this.handleLogin();
      }
      console.log('logged in', loggedin);
    }
  }

  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const email = this.registerForm.get('email').value;
      const password = this.registerForm.get('password').value;
      const firstName = this.registerForm.get('firstName').value;
      const lastName = this.registerForm.get('lastName').value;

      let registered = null;
      try {
        registered = await this.auth.emailSignUp(email, password);
      } catch (error) {
        this.handleError(error);
      }

      this.isLoading = false;
      if (registered) {
        this.handleLogin();
      }
      console.log('registered', registered);
    }
  }

  async handleError(error) {
    console.log('error occured', error);
    let message = '';
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Die angegebene E-Mail Adresse ist bereits in Verwendung.';
        break;
      case 'auth/invalid-password':
        message = 'Das angegebene Passwort ist ungültig.';
        break;
      case 'auth/invalid-email':
        message = 'Bitte geben Sie eine gültige E-Mail Adresse an.';
        break;
      case 'auth/wrong-password':
        message = 'E-Mail Adresse oder Passwort ungültig.';
        break;
      case 'auth/too-many-requests':
        message = 'Es wurden zu viele Anfragen von Ihrem Gerät geschickt. Bitte versuchen Sie es in Kürze erneut.';
        break;
      default:
        message = error.message;
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

  private handleLogin(): void {
    this.router.navigate(['/']);
  }

  // GETTERS for validation errors

  // LOGIN GETTERS
  get loginEmailRequired(): boolean {
    return this.loginForm.get('email').hasError('required') && this.loginForm.get('email').touched;
  }

  get loginEmailEmail(): boolean {
    return this.loginForm.get('email').hasError('email')
      && !this.loginForm.get('email').hasError('required')
      && this.loginForm.get('email').touched;
  }

  get loginPasswordRequired(): boolean {
    return this.loginForm.get('password').hasError('required') && this.loginForm.get('password').touched;
  }

  //  REGISTER GETTERS
  get registerEmailRequired(): boolean {
    return this.registerForm.get('email').hasError('required') && this.registerForm.get('email').touched;
  }

  get registerEmailEmail(): boolean {
    return this.registerForm.get('email').hasError('email') && !this.registerForm.get('email').hasError('required')
      && this.registerForm.get('email').touched;
  }

  get registerPasswordRequired(): boolean {
    return this.registerForm.get('password').hasError('required') && this.registerForm.get('password').touched;
  }

  get registerRepeatPasswordRequired(): boolean {
    return this.registerForm.get('repeatPassword').hasError('required') && this.registerForm.get('repeatPassword').touched;
  }

  get registerRepeatPasswordMismatch(): boolean {
    return !this.registerForm.get('repeatPassword').hasError('required') && this.registerForm.get('repeatPassword').hasError('mismatch') && this.registerForm.get('repeatPassword').touched;
  }

}
