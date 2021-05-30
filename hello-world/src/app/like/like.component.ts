import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
})
export class LikeComponent {
  @Input('number-of-likes') numberOfLikes: number = 0;
  @Input('is-liked') isLiked: boolean = false;
  @Output('changed') changed = new EventEmitter();

  onClick() {
    this.isLiked = !this.isLiked;
    this.numberOfLikes += this.isLiked ? 1 : -1;
    let args: LikeComponentChangedEventArgs = {
      numberOfLikes: this.numberOfLikes,
      isLiked: this.isLiked,
    };
    this.changed.emit(args);
  }
}

export interface LikeComponentChangedEventArgs {
  numberOfLikes: number;
  isLiked: boolean;
}
