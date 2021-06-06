import { AuthorizationError } from '../common/errors/authorization-error';
import { ForbiddenError } from '../common/errors/forbidden-error';
import { BadRequestError } from '../common/errors/bad-request-error';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppError } from '../common/errors/application-error';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BaseService<T> {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token':
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk5YWI5MDlhODQ2ZDRkODA1OGI0YzMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MjA3NzM2OTV9.HeGLpoma-KMypGWQXqOczrFwnSB0DU6Xg7fXnYvYCy4',
    }),
    params: new HttpParams(),
  };

  constructor(@Inject(String) private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get<T[]>(this.url).pipe(
      map((x) => x),
      catchError(this.errorHandler)
    );
  }

  getOne(id: string) {
    return this.http.get<T>(this.url + '/' + id).pipe(
      map((x) => x),
      catchError(this.errorHandler)
    );
  }

  create(resource: T | any) {
    return this.http.post<T>(this.url, resource, this.httpOptions).pipe(
      map((x) => x),
      catchError(this.errorHandler)
    );
  }

  update(resource: T | any) {
    return this.http
      .put<T>(this.url + '/' + resource._id, resource, this.httpOptions)
      .pipe(
        map((x) => x),
        catchError(this.errorHandler)
      );
  }

  delete(id: string) {
    return this.http.delete<T>(this.url + '/' + id, this.httpOptions).pipe(
      map((x) => x),
      catchError(this.errorHandler)
    );
  }

  errorHandler(err: any) {
    if (err.status == 400) return throwError(new BadRequestError(err.error));
    if (err.status == 403) return throwError(new ForbiddenError(err.error));
    if (err.status == 401) return throwError(new AuthorizationError(err.error));
    return throwError(new AppError(err));
  }
}
