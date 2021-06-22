import { SnackBarService } from './../../services/snack-bar.service';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from 'src/app/services/toast-service';
import { AppError } from 'src/app/common/errors/application-error';
import { BadRequestError } from 'src/app/common/errors/bad-request-error';
import { ForbiddenError } from 'src/app/common/errors/forbidden-error';
import { AuthorizationError } from 'src/app/common/errors/authorization-error';
import * as _ from 'lodash';
import { PasswordValidators } from 'src/app/common/validators/password.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  hideShowPassword: boolean = true;
  hideShowConfirmPassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastService: ToastService,
    private _snackBar: SnackBarService
  ) {
    this.form = fb.group(
      {
        email: fb.control('', [Validators.required, Validators.email]),
        name: fb.control('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ]),
        password: fb.control('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ]),
        confirmPassword: fb.control('', [Validators.required]),
      },
      {
        validators: [PasswordValidators.confrimPasswordMismatch],
      }
    );
  }

  get name() {
    return this.form.get('name') as FormControl;
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.form.get('confirmPassword') as FormControl;
  }

  ngOnInit(): void {}

  signUp() {
    this.usersService
      .create(_.omit(this.form.value, ['confirmPassword']))
      .subscribe(
        (user) => {
          if (user && user.token) {
            localStorage.setItem('token', user.token);
            this.router.navigate(['/']);
          }
        },
        (error) => this.errorHandler(error)
      );
  }

  errorHandler(error: AppError) {
    if (error instanceof BadRequestError)
      this.showDanger('Bad request error: ' + error.originalError);
    else if (error instanceof ForbiddenError)
      this.showDanger('Forbidden error: ' + error.originalError);
    else if (error instanceof AuthorizationError)
      this.showDanger('Authorization error: ' + error.originalError);
    else {
      this.showDanger('General error: ' + JSON.stringify(error));
      //throw error;
    }
  }

  showStandard() {
    this.toastService.show('I am a standard toast');
    this.openSnackBar('I am a standard snackbar');
  }

  showSuccess() {
    this.toastService.show('Operation Successful!', {
      classname: 'bg-success text-light',
      delay: 5000,
    });
    this.openSnackBar('Operation Successful!', ['bg-success']);
  }

  showDanger(dangerTpl: string) {
    this.toastService.show(dangerTpl, {
      classname: 'bg-danger text-light',
      delay: 5000,
    });
    this.openSnackBar(dangerTpl, ['bg-danger']);
  }

  openSnackBar(message: string, classesNames?: string[]) {
    // this._snackBar.show(message, classesNames);
  }
}
