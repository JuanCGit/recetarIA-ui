import { HttpInterceptorFn } from '@angular/common/http';

export const localeInterceptor: HttpInterceptorFn = (req, next) => {
  let locale = localStorage.getItem('lang') || 'en';
  if (!locale) return next(req);
  return next(
    req.clone({
      setHeaders: { 'Accept-Language': locale },
    }),
  );
};
