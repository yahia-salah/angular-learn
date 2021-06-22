import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
  static cannotContainCharacters(
    control: AbstractControl
  ): ValidationErrors | null {
    let invalidCharacters = [
      { char: ' ', found: false },
      { char: '$', found: false },
      { char: '#', found: false },
      { char: '@', found: false },
      { char: '!', found: false },
    ];
    let value = control.value as string;
    let invalid = false;
    for (let i = 0; i < invalidCharacters.length; i++) {
      invalidCharacters[i].found = value.includes(invalidCharacters[i].char);
      if (invalidCharacters[i].found) invalid = true;
    }

    if (invalid)
      return {
        cannotContainCharacters: invalidCharacters
          .filter((x) => x.found)
          .map((x) => x.char),
      };

    return null;
  }

  static shouldBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((control.value as string) === 'mosh')
          resolve({ shouldBeUnique: true });
        else resolve(null);
      }, 3000);
    });
  }
}
