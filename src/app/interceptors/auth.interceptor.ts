import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { catchError, map, switchMap, take, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.token$.pipe(
    take(1),
    map((token) =>
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      }),
    ),
    switchMap((request) => next(request)),
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
      }

      return throwError(() => error);
    }),
  );
};
