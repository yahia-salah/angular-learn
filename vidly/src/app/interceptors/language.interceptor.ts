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
export class LanguageInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes('assets')) {
      const lang = localStorage.getItem('lang') || 'en';
      req = req.clone({
        setHeaders: {
          'Accept-Language': lang,
        },
      });
    }
    return next.handle(req);
  }
}
