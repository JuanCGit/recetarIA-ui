import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../services/loader/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  return next(req).pipe(
    tap({
      subscribe: () => loaderService.addPetition(),
      finalize: () => loaderService.removePetition(),
    }),
  );
};
