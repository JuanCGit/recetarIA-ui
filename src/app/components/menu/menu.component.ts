import { Component, Input } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
})
export class MenuComponent {
  @Input() isMobile: boolean = false;
  protected readonly imagePath: string = '../../../assets/icons/';
  protected readonly menuItems = [
    {
      link: 'ai-chef',
      alt: 'AI recipe maker',
      activeSrc: 'active-hat.svg',
      inactiveSrc: 'hat.svg',
      routerLinkActive: 'active',
      active: 'aiChefActive'
    },
    {
      link: 'library',
      alt: 'Recipe library',
      activeSrc: 'active-library.svg',
      inactiveSrc: 'library.svg',
      routerLinkActive: 'active',
      active: 'libraryActive'
    },
    {
      link: 'create',
      alt: 'Add recipe',
      activeSrc: 'active-add.svg',
      inactiveSrc: 'add.svg',
      routerLinkActive: 'active',
      active: 'createActive'
    }
  ];

}
