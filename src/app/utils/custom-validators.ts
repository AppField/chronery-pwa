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

export function hasLengthEight(control: FormControl): any {
  return (new RegExp('^.{8,}$').test(control.value)) ? true : { mismatchLength: true };
}

export function containsNumbersValidator(control: FormControl): any {
  return (new RegExp('[0-9]{1,}').test(control.value)) ? true : { missingNumber: true };
}

export function containsUpperValidator(control: FormControl): any {
  return (new RegExp('[A-Z]{1,}').test(control.value)) ? true : { missingUpper: true };
}

export function containsLowerValidator(control: FormControl): any {
  return (new RegExp('[a-z]{1,}').test(control.value)) ? true : { missingLower: true };
}

export function getPasswordErrorState(control: AbstractControl): number {
  const mismatchLength = control.hasError('mismatchLength');
  const missingNumber = control.hasError('missingNumber');
  const missingUpper = control.hasError('missingUpper');
  const missingLower = control.hasError('missingLower');

  if (missingNumber && missingUpper && missingLower && mismatchLength) {
    // 'Required';
    return 1;
  } else if (missingNumber) {
    // 'One number is required';
    return 2;
  } else if (missingUpper) {
    // 'One upper letter is required';
    return 3;
  } else if (missingLower) {
    // 'One lower letter is required';
    return 4;
  } else if (mismatchLength) {
    // 'Minimum 8 characters are required';
    return 5;
  }
}
