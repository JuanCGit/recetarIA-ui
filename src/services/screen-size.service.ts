import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService {
  #screenWidth = signal(window.innerWidth);
  isMobile = computed(() => this.#screenWidth() <= 745);

  constructor() {
    window.addEventListener('resize', () => this.#updateScreenWidth());
  }

  #updateScreenWidth() {
    this.#screenWidth.set(window.innerWidth);
  }
}
