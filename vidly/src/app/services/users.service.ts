import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService<any> {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/users', http);
  }
}
