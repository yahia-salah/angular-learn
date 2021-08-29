import { AuthService } from 'shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    auth.user$.subscribe((user) => {
      if (user) {
        router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {}

  login() {
    this.auth.login();
  }
}
