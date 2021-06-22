import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'vidly';
  links = [
    { title: 'Home', path: '/', icon: 'home', visible: 'all' },
    {
      title: 'Genres',
      path: '/genres',
      icon: 'category',
      visible: 'loggedin',
    },
    {
      title: 'Movies',
      path: '/movies',
      icon: 'movie',
      visible: 'loggedin',
    },
    {
      title: 'Sign up',
      path: '/signup',
      icon: 'person_add',
      visible: 'loggedout',
    },
    {
      title: 'Login',
      path: '/login',
      icon: 'login',
      visible: 'loggedout',
    },
  ];

  constructor(
    public route: ActivatedRoute,
    public authService: AuthService,
    public router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
