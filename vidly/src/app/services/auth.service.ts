import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  currentUser: any;

  constructor(http: HttpClient) {
    super('http://localhost:3000/api/auth', http);

    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelperService();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials: any) {
    return this.create(credentials).pipe(
      map((response) => {
        let result = response;

        if (result && result.token) {
          localStorage.setItem('token', result.token);

          let jwt = new JwtHelperService();
          this.currentUser = jwt.decodeToken(result.token);
          console.log(this.currentUser);

          return true;
        } else return false;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    let jwt = new JwtHelperService();
    let token = localStorage.getItem('token');
    return token ? !jwt.isTokenExpired(token) : false;
  }
}

export interface User {
  name: string;
  id: string;
  isAdmin: boolean;
}
