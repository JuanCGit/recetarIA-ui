import {Component, inject, Input, linkedSignal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AvatarModule],
})
export class MenuComponent {
  #authService = inject(AuthService);

  firstUserLetter = linkedSignal(() => this.#authService.user()?.username.charAt(0).toUpperCase() ?? '');

  @Input() isMobile: boolean = false;
  protected readonly imagePath: string = '../../../assets/icons/';
  protected readonly menuItems = [
    {
      link: 'ai-chef',
      alt: 'AI recipe maker',
      activeSrc: 'active-hat.svg',
      inactiveSrc: 'hat.svg',
      routerLinkActive: 'active',
      active: 'aiChefActive',
      hover: false
    },
    {
      link: 'library',
      alt: 'Recipe library',
      activeSrc: 'active-library.svg',
      inactiveSrc: 'library.svg',
      routerLinkActive: 'active',
      active: 'libraryActive',
      hover: false
    },
    {
      link: 'create',
      alt: 'Add recipe',
      activeSrc: 'active-add.svg',
      inactiveSrc: 'add.svg',
      routerLinkActive: 'active',
      active: 'createActive',
      hover: false
    }
  ];
  hoverUser = false;

}
