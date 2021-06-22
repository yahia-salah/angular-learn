import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Genre } from './genre.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends BaseService<Movie> {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/movies', http);
  }
}

@Injectable({
  providedIn: 'root',
})
export class MoviesThumbnailUploadService extends BaseService<any> {
  constructor(http: HttpClient) {
    super('http://localhost:3000/api/movies/thumbnail-upload', http);
    // this.httpOptions.headers
    //   .delete('Content-Type')
    //   .set('Content-Type', 'multipart/form-data');
  }
}

export interface Movie {
  _id: any;
  title: string;
  genre: Genre;
  numberInStock: number;
  dailyRentalRate: number;
  thumbnail: string;
}
