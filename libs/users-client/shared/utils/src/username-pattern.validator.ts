import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UsernameValidator: ValidatorFn = (control: AbstractControl) => {
  const startsWithNumber = /^[0-9]/;
  const hasSpecialCharacters = /^[a-zA-Z0-9_.]+$/;

  const isStartsWithNumber = startsWithNumber.test(control.value);
  const hasSpecialChars = !hasSpecialCharacters.test(control.value);

  if (isStartsWithNumber) {
    return { pattern: 'Username should not start with a number' };
  }

  if (hasSpecialChars) {
    return { pattern: 'Username should not contain special characters' };
  }

  return null;
};
