import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  imports: [RouterLink],
})
export class MenuComponent {
  @Input() isMobile: boolean = false;
  protected readonly imagePath: string = '../../../assets/icons/';
}
