import { Component, computed } from '@angular/core';
import { ScreenSizeService } from '../../../services/screen-size.service';
import {Editor} from 'primeng/editor';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
  imports: [Editor, FormsModule, Button],
})
export class RecipePageComponent {
  isMobile = computed(() => this.screenSize.isMobile());
  recipeDescription: any;
  recipeName: any;
  constructor(private screenSize: ScreenSizeService) {}
}
