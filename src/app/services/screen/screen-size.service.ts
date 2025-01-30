import { Injectable, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  isMobile = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(window.innerWidth),
      map(() => window.innerWidth <= 745),
      debounceTime(200),
    ),
  );
}
