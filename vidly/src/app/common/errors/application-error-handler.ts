import { AppError } from './application-error';
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
  handleError(error: any) {
    alert('Something went wrong! Please try again later...');
    console.log(error);
  }
}
