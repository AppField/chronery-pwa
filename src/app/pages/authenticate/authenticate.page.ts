import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoginData, RegisterData } from '../../models/authenticate';
import { matchPasswordValidator } from '../../utils/custom-validators';
import { ToastController } from '@ionic/angular';

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
              private userService: UserService,
              private toastCtrl: ToastController) {
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

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = new LoginData(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      );
      let loggedin = null;
      try {
        loggedin = await this.userService.login(loginData);
      } catch (error) {
        this.handleError(error);
      }
      this.isLoading = false;
      console.log('logged in', loggedin);
    }
  }

  async register() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const registerData = new RegisterData(
        this.registerForm.get('email').value,
        this.registerForm.get('firstName').value,
        this.registerForm.get('lastName').value,
        this.registerForm.get('password').value
      );
      let registered = null;
      try {
        registered = await this.userService.register(registerData);
      } catch (error) {
        this.handleError(error);
      }

      this.isLoading = false;
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
