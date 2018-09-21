import { AbstractControl, FormControl } from '@angular/forms';
import { isAfter } from 'date-fns';
import { getDateTime } from './utils';


export function timeIsAfter(control: FormControl): any {
  if (control.parent) {
    const from = control.parent.controls['from'].value;
    const to = control.value;

    const fromDate = getDateTime(from);
    const toDate = getDateTime(to);

    return isAfter(toDate, fromDate) ? true : { isNotAfter: true };
  }
  return null;
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

export function mustBeTruthy(control: AbstractControl): { [key: string]: boolean } | boolean {
  return control.value ? true : { notChecked: true };
}

export function hasLengthSix(control: FormControl): { [key: string]: boolean } | boolean {
  return (new RegExp('^.{6,}$').test(control.value)) ? true : { mismatchLength: true };
}