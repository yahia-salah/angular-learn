import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit {
  @Input('is-starred') isSelected: boolean;
  @Output('changed') changed = new EventEmitter();

  constructor() {
    this.isSelected = false;
  }

  ngOnInit(): void {}

  onClick() {
    let oldValue = this.isSelected;
    let newValue = (this.isSelected = !this.isSelected);
    let changedValueEventArgs: StarComponentChangedEventArgs = {
      oldValue,
      newValue,
    };
    this.changed.emit(changedValueEventArgs);
  }
}

export interface StarComponentChangedEventArgs {
  oldValue: boolean;
  newValue: boolean;
}
