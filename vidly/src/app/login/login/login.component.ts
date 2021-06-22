import { SnackBarService } from './../../services/snack-bar.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from './../../services/toast-service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppError } from 'src/app/common/errors/application-error';
import { BadRequestError } from 'src/app/common/errors/bad-request-error';
import { ForbiddenError } from 'src/app/common/errors/forbidden-error';
import { AuthorizationError } from 'src/app/common/errors/authorization-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  invalidLogin: boolean = false;
  hideShowPassword: boolean = true;
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private _snackBar: SnackBarService,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  signIn() {
    this.authService.login(this.form.value).subscribe(
      (result) => {
        if (result) {
          this.route.queryParamMap.subscribe((params) => {
            this.router.navigate([params.get('returnUrl') || '/']);
          });
        } else this.invalidLogin = true;
      },
      (error) => {
        this.errorHandler(error);
        this.invalidLogin = true;
      }
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
    //this._snackBar.show(message, classesNames);
  }
}
