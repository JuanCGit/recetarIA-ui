import {catchError, map, switchMap, take, throwError} from 'rxjs';
import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/auth/token.service';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return tokenService.token$.pipe(
    take(1),
    map((token) => {
      if (token) {
        return req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
      }
      return req;
    }),
    switchMap((request) => next(request)),
    catchError((error) => {
      if (error.status === 401) {
        const router = inject(Router);
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
