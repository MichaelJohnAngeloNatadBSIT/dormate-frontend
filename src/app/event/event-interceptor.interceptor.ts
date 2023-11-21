import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class EventInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (event.body.message) {
              this.dialog.open(EventDialogComponent, {
                data: { message: event.body.message },
              });
            }
          }
        },
        (err) => {
          // create event message interceptor
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'An unknown error occurred!!';
            if (error.error.message) {
              errorMessage = error.error.message;
            }
            this.dialog.open(EventDialogComponent, {
              data: { message: errorMessage },
            });

            return throwError(error);
          });
        }
      )
    );
  }
}
