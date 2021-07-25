import { SnackBarService } from '../services/snack-bar.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerOverlayService } from '../spinner-overlay/spinner-overlay.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(
    private _spinner: SpinnerOverlayService,
    private _snackBar: SnackBarService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }
    const started = Date.now();
    let ok: string;
    let originalError: any;
    this._spinner.hide();
    this._spinner.show();

    // extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => {
          ok = event instanceof HttpResponse ? 'succeeded' : '';
        },
        // Operation failed; error is an HttpErrorResponse
        (error) => {
          ok = 'failed';
          originalError = error;
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
        console.log('HTTP Interceptor', msg);
        //this.service.add(msg);
        this._spinner.hide();
        if (ok == 'succeeded') {
          if (req.method != 'GET')
            this._snackBar.show('Operation Successful!', ['success']);
        } else {
          this._snackBar.show(JSON.stringify(originalError), ['failure']);
        }
      })
    );
  }
}
