import { Component, computed } from '@angular/core';
import { ScreenSizeService } from '../../../services/screen-size.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
})
export class RecipePageComponent {
  isMobile = computed(() => this.screenSize.isMobile());
  constructor(private screenSize: ScreenSizeService) {}
}
