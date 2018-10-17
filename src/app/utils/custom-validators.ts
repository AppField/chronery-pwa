import { AbstractControl, FormControl } from '@angular/forms';
import { isAfter } from 'date-fns';

export function timeIsAfter(control: FormControl): any {
  if (control.parent) {
    const from = control.parent.controls['from'].value;
    const to = control.value;

    console.log('FROM', from);
    console.log('TO', to);

    const fromDate = new Date(from).setSeconds(0);
    const toDate = new Date(to).setSeconds(0);
    return isAfter(toDate, fromDate) ? true : { isNotAfter: true };
  }
  return null;
}


export function isEmail(control: AbstractControl): { [key: string]: boolean } | boolean {
  return (new RegExp(/^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/).test(control.value)) ? true : { invalidEmail: true };
}


export function mustBeTruthy(control: AbstractControl): { [key: string]: boolean } | boolean {
  return control.value ? true : { notChecked: true };
}

/***
 *  Password Valiators
 */
export function matchPasswordValidator(control: FormControl): any {
  if (control.parent) {
    const password = control.parent.controls['password'].value;
    const repeatPassword = control.value;
    return password === repeatPassword ? true : { mismatch: true };
  }
  return null;
}

export function hasLengthSix(control: FormControl): { [key: string]: boolean } | boolean {
  return (new RegExp('^.{6,}$').test(control.value)) ? true : { mismatchLength: true };
}