import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('assets')) {
      const token = localStorage.getItem('token') || '';
      req = req.clone({
        setHeaders: {
          Authorization: token ? 'Bearer ' + token : '',
        },
      });
    }
    return next.handle(req);
  }
}
