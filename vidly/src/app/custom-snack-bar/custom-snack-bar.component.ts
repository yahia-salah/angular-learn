import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';

@Component({
  selector: 'custom-snack-bar',
  templateUrl: './custom-snack-bar.component.html',
  styleUrls: ['./custom-snack-bar.component.css'],
})
export class CustomSnackBarComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<CustomSnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
}
