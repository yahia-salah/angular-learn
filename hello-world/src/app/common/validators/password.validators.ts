import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static confrimPasswordMismatch(
    control: AbstractControl
  ): ValidationErrors | null {
    let confirmValue = control.get('confirmpassword')?.value;
    let newValue = control.get('newpassword')?.value;
    if (newValue && confirmValue && newValue !== confirmValue) {
      return { confrimPasswordMismatch: true };
    }
    return null;
  }

  static oldPasswordMismatch(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((control.value as string) !== '12345678')
          resolve({ oldPasswordMismatch: true });
        else resolve(null);
      }, 3000);
    });
  }
}
