import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {LocalstoreService} from './localstore.service';
import {STORE_USER_KEY} from '../utils/constants';
import {Error} from '../models/Error';
import {SnackbarComponent} from '../components/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private storageService: LocalstoreService,
    private _snackBar: MatSnackBar
  ) {}

  createHeaders() {
    const userObject = this.storageService.getData(STORE_USER_KEY);
    return new HttpHeaders({
      'Authorization': `Bearer ${userObject.token || ''}`,
      'id': userObject.id || ''
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const options = {headers: this.createHeaders()};
    request = request.clone(options);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('Error', error)
        this._snackBar.openFromComponent(SnackbarComponent, {
          data: {
            message: error?.error?.message || 'Something went wrong', type: 'ERROR'
          }
        });
        return throwError(error);
      }));
  }
}
