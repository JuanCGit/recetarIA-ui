import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';

@Component({
  selector: 'app-ai-chef',
  templateUrl: './ai-chef.page.component.html',
  styleUrl: './ai-chef.page.component.scss',
  standalone: true,
  imports: [FormsModule, ToggleSwitch, Button, CustomInputComponent],
})
export class AiChefPageComponent {
  writeIngredients = signal<boolean>(true);
  hoverUploader = signal<boolean>(false);
  loadedRecipe = signal<boolean>(false);
  ingredients = signal<string[]>(['lettuce']);
  ingredientInput = signal<string>('');
  isMobile = computed(() => this.screenSize.isMobile());

  constructor(private screenSize: ScreenSizeService) {}

  addIngredient(): void {
    this.ingredients.set([...this.ingredients(), this.ingredientInput()]);
    this.ingredientInput.set('');
  }
}
