import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderCount = signal(0);
  isLoading = computed<boolean>(() => this.loaderCount() > 0);

  addPetition() {
    this.loaderCount.set(this.loaderCount() + 1);
  }

  removePetition() {
    this.loaderCount.set(this.loaderCount() - 1);
  }
}
