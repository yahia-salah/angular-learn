import { UserService } from 'shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    auth.user$.subscribe((user) => {
      if (user) {
        userService.save(user);
        let returnUrl = route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) router.navigate([returnUrl]);
      }
    });
  }
}
