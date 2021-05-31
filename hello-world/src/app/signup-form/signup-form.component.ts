import { UsernameValidators } from '../common/validators/username.validators';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(3),
        UsernameValidators.cannotContainCharacters,
      ],
      [UsernameValidators.shouldBeUnique]
    ),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  signUp() {
    this.form.setErrors({
      serverError: true,
    });
  }
}
