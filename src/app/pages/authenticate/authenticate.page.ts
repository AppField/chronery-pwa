import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../utils/custom-validators';
import { UserService } from '../../services/user/user.service';
import { LoginData, RegisterData } from '../../models/authenticate';

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
              private userService: UserService) {
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
      repeatPassword: ['', [Validators.required, CustomValidators.matchPasswordValidator]]
    });
  }

  async login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loginData = new LoginData(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      );
      const loggedin = await this.userService.login(loginData);
      this.isLoading = false;
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
      const registered = await this.userService.register(registerData);
      this.isLoading = false;
      console.log('registered', registered);
    }
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
