import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenreService extends BaseService<Genre> {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/genres', http);
  }
}

export interface Genre {
  _id: any;
  name: string;
}
