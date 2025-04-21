import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    Button,
    Select,
    CustomInputComponent,
    TranslatePipe,
  ],
  templateUrl: './profile.page.component.html',
  styleUrls: ['./profile.page.component.scss'],
})
export class ProfilePageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #translate = inject(TranslateService);
  authService = inject(AuthService);

  username = linkedSignal(() => this.authService.user()?.username ?? '');
  selectedLanguage = signal<string>(
    localStorage.getItem('lang') ?? this.#translate.getBrowserLang() ?? 'en',
  );

  availableLanguages = computed(() => {
    this.selectedLanguage();
    return [
      { id: 'en', name: this.#translate.instant('PROFILE.LANGUAGES.EN') },
      { id: 'es', name: this.#translate.instant('PROFILE.LANGUAGES.ES') },
      { id: 'ca', name: this.#translate.instant('PROFILE.LANGUAGES.CA') },
    ];
  });

  #languageEffect = effect(() => {
    const lang = this.selectedLanguage();
    this.#translate.use(lang);
    localStorage.setItem('lang', lang);
  });

  updateUsername() {
    this.authService.updateUsername(this.username()).subscribe();
  }
}
