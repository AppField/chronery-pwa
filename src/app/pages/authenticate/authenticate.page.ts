import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { hasLengthSix, isEmail, matchPasswordValidator, mustBeTruthy } from '../../utils/custom-validators';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { expandCollapse, fadeScaleInOut, fadeInOut } from '../../core/animations';

@Component({
  selector: 'chy-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
  animations: [expandCollapse, fadeScaleInOut, fadeInOut(0.5)]
})
export class AuthenticatePage implements OnInit {

  emailForm: FormGroup;
  loginForm: FormGroup;
  registerForm: FormGroup;

  isEmailLogin = false;
  isEmailChecked = false;
  isRegistering = false;

  isLoading = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private toastCtrl: ToastController,
              private router: Router) {
  }

  ngOnInit() {
  }

  reset(): void {
    this.isEmailLogin = false;
    this.isEmailChecked = false;
    this.isRegistering = false;
  }

  emailLoginChosen(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, isEmail]],
    });
    this.isEmailLogin = true;
  }

  cancelEmailLogin(): void {
    this.isEmailLogin = false;
    this.reset();
  }

  async loginWithGoogle() {
    const loggedin = await this.auth.googleLogin();
    if (loggedin) {
      this.handleLogin();
    }
  }

  async loginWithFacebook() {
    const loggedin = await this.auth.facebookLogin();
    if (loggedin) {
      this.handleLogin();
    }
  }

  async loginWithTwitter() {
    const loggedin = await this.auth.twitterLogin();
    if (loggedin) {
      this.handleLogin();
    }
  }

  async loginWithGithub() {
    const loggedin = await this.auth.githubLogin();
    if (loggedin) {
      this.handleLogin();
    }
  }

  // FORM SUBMIT HANDLERS

  async checkEmail() {
    if (!this.emailForm.valid) {
      return;
    }
    // check if user exists;
    const email = this.emailForm.get('email').value.trim();
    const signupError = await this.auth.emailSignInMethods(email);

    const emailExists = signupError.length > 0;

    if (emailExists) {
      // When there is an account associated with this email, show the login form
      this.setuploginForm(email);
    } else {
      // When there isn't an account associated with this email, show the register form
      this.setupRegisterForm(email);
      this.isRegistering = true;
    }
    this.isEmailChecked = true;
  }

  private setuploginForm(email): void {
    this.loginForm = this.fb.group({
      email: [email, [Validators.required, isEmail]],
      password: ['', Validators.required],
    });
  }

  private setupRegisterForm(email): void {
    this.registerForm = this.fb.group({
      email: [email, [Validators.required, isEmail]],
      firstName: [''],
      lastName: [''],
      password: ['', [Validators.required, hasLengthSix]],
      repeatPassword: ['', [Validators.required, matchPasswordValidator]],
      readDataProtection: [false, [Validators.required, mustBeTruthy]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const email = this.loginForm.get('email').value.trim();
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
    }
  }

  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const email = this.registerForm.get('email').value.trim();
      const password = this.registerForm.get('password').value;
      const firstName = this.registerForm.get('firstName').value.trim();
      const lastName = this.registerForm.get('lastName').value.trim();
      const readDataProtection = this.registerForm.get('readDataProtection').value;

      let registered = null;
      try {
        registered = await this.auth.emailSignUp(email, password, firstName, lastName, readDataProtection);
      } catch (error) {
        this.handleError(error);
      }

      this.isLoading = false;
      if (registered) {
        this.handleLogin();
      }
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

  get activeForm(): FormGroup {
    if (!this.isEmailChecked) {
      return this.emailForm;
    } else if (this.isRegistering) {
      return this.registerForm;
    } else {
      return this.loginForm;
    }
  }

  emailFormSubmit(): void {
    console.log('submitting form');
    this.markControlsAsTouched();
    if (!this.isEmailChecked) {
      this.checkEmail();
    } else if (this.isRegistering) {
      this.register();
    } else {
      this.login();
    }
  }

  get formTitle(): string {
    if (!this.isRegistering) {
      return 'Mit E-Mail anmelden';
    } else {
      return 'Konto erstellen';
    }
  }

  get buttonText(): string {
    if (!this.isEmailChecked) {
      return 'Weiter';
    } else if (this.isRegistering) {
      return 'Registrieren';
    } else {
      return 'Anmelden';
    }
  }

  private markControlsAsTouched(): void {
    const controls = this.activeForm.controls;
    Object.keys(controls).forEach((key: string) => {
      controls[key].markAsTouched();
    });
  }

  // GETTERS for validation errors

  get emailRequired(): boolean {
    const form = this.activeForm;
    return form.get('email').hasError('required') && form.get('email').touched;
  }

  get emailValid(): boolean {
    const form = this.activeForm;
    return form.get('email').hasError('invalidEmail')
      && !form.get('email').hasError('required')
      && form.get('email').touched;
  }

  get passwordRequired(): boolean {
    const form = this.activeForm;
    const control = form.get('password');
    if (control) {
      return control.hasError('required') && control.touched;
    }
  }

  get passwordHasLengthSix(): boolean {
    const form = this.activeForm;
    const control = form.get('password');
    if (control) {
      return !control.hasError('required')
        && control.hasError('hasLengthSix')
        && control.touched;
    }
  }

  get repeatPasswordRequired(): boolean {
    const form = this.activeForm;
    const control = form.get('repeatPassword');
    if (control) {
      return control.hasError('required') && control.touched;
    }
  }

  get repeatPasswordMismatch(): boolean {
    const form = this.activeForm;
    const control = form.get('repeatPassword');
    if (control) {
      return !control.hasError('required') &&
        control.hasError('mismatch') && control.touched;
    }
  }

  get readDataProtection(): boolean {
    const form = this.activeForm;
    const control = form.get('readDataProtection');
    if (control) {
      return control.hasError('notChecked') && control.touched;
    }
  }
}
