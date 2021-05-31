import { PasswordValidators } from './../common/validators/password.validators';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        oldpassword: fb.control(
          '',
          [Validators.required, Validators.minLength(8)],
          [PasswordValidators.oldPasswordMismatch]
        ),
        newpassword: fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmpassword: fb.control('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: [PasswordValidators.confrimPasswordMismatch],
      }
    );
  }

  get oldpassword() {
    return this.form.get('oldpassword') as FormControl;
  }

  get newpassword() {
    return this.form.get('newpassword') as FormControl;
  }

  get confirmpassword() {
    return this.form.get('confirmpassword') as FormControl;
  }

  ngOnInit(): void {}
}
