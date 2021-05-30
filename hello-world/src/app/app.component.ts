import { LikeComponentChangedEventArgs } from './like/like.component';
import { Component } from '@angular/core';
import { StarComponentChangedEventArgs } from './star/star.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'HELLO-WORLD';

  onStarChanged($event: StarComponentChangedEventArgs) {
    console.log('$event', $event);
  }

  onLikeChanged($event: LikeComponentChangedEventArgs) {
    console.log('$event', $event);
  }
}
