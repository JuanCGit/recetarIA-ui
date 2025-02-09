import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-spinner',
  template: `@if (loaderService.isLoading()) {
    <div class="container"><div class="loader"></div></div>
  }`,
  styleUrl: './spinner.component.scss',
  standalone: true,
})
export class SpinnerComponent {
  loaderService = inject(LoaderService);
}
