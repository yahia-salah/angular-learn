import { CustomSnackBarComponent } from './../custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  show(message: string, classesNames?: string[]) {
    this._snackBar.openFromComponent(CustomSnackBarComponent, {
      data: message,
      duration: 5000,
      panelClass: classesNames,
    });
  }
}
