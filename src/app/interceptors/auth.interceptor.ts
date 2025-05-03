import { catchError, map, switchMap, take, throwError } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../services/auth/token.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return tokenService.token$.pipe(
    take(1),
    map((token) => {
      if (!token) return req;
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }),
    switchMap((request) => next(request)),
    catchError((error) => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
