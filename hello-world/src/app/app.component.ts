import { LikeComponentChangedEventArgs } from './like/like.component';
import { Component } from '@angular/core';
import { StarComponentChangedEventArgs } from './star/star.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HELLO-WORLD';
  links = [
    { title: 'Sign Up', fragment: '' },
    { title: 'Password Reset', fragment: 'passwordReset' },
    { title: 'Genre', fragment: 'genres' },
  ];
  constructor(public route: ActivatedRoute) {}

  onStarChanged($event: StarComponentChangedEventArgs) {
    console.log('$event', $event);
  }

  onLikeChanged($event: LikeComponentChangedEventArgs) {
    console.log('$event', $event);
  }
}
