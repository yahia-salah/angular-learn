import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {
  @Input() message = '';
  color = 'primary';

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      switch (this.color) {
        case 'primary':
          this.color = 'accent';
          break;
        case 'accent':
          this.color = 'warn';
          break;
        case 'warn':
          this.color = 'primary';
          break;
      }
    }, 1000);
  }
}
