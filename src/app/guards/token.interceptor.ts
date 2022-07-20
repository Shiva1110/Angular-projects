import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenReq = request.clone({
      setHeaders: {
        'auth_token': `${this.authService.getUserToken()}`
      }
    })
    return next.handle(tokenReq).pipe(catchError((err: HttpErrorResponse) => {
      if(err instanceof HttpErrorResponse && err?.error?.error === 'Invalid Token') {
        this.router.navigate(['/']);
      }
      return throwError(() => err);
    }));
  }
}
