import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from '../../utils/utils';
import { CustomValidators } from '../../utils/custom-validators';

@Component({
  selector: 'chy-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  login(): void {
    if (this.loginForm.valid) {
      console.log('login', this.loginForm.value);
    }
  }

  register(): void {
    if (this.registerForm.valid) {
      console.log('register data', this.registerForm.value);
    }
  }


  // GETTERS for validation errors

  // LOGIN GETTERS
  get loginEmailRequired(): boolean {
    return this.loginForm.get('email').hasError('required') && this.loginForm.get('email').touched;
  }

  get loginEmailEmail(): boolean {
    return this.loginForm.get('email').hasError('email') && !this.loginForm.get('email').hasError('required');
  }

  get loginPasswordRequired(): boolean {
    return this.loginForm.get('password').hasError('required') && this.loginForm.get('password').touched;
  }

  //  REGISTER GETTERS
  get registerEmailRequired(): boolean {
    return this.registerForm.get('email').hasError('required') && this.registerForm.get('email').touched;
  }

  get registerEmailEmail(): boolean {
    return this.registerForm.get('email').hasError('email') && !this.registerForm.get('email').hasError('required');
  }

  get registerPasswordRequired(): boolean {
    return this.registerForm.get('password').hasError('required') && this.registerForm.get('password').touched;
  }

  get registerRepeatPasswordRequired(): boolean {
    return this.registerForm.get('repeatPassword').hasError('required') && this.registerForm.get('repeatPassword').touched;
  }

  get registerRepeatPasswordMismatch(): boolean {
    return !this.registerForm.get('repeatPassword').hasError('required') && this.registerForm.get('repeatPassword').hasError('mismatch');
  }

}
