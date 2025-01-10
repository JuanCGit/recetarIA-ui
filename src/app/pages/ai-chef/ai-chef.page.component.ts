import { Component, signal, computed } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { IngredientList } from './components/ingredient-list/ingredient-list';
import { Editor } from 'primeng/editor';

@Component({
  selector: 'app-ai-chef',
  templateUrl: './ai-chef.page.component.html',
  styleUrl: './ai-chef.page.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Button,
    CustomInputComponent,
    IngredientList,
    Editor,
  ],
})
export class AiChefPageComponent {
  writeIngredients = signal<boolean>(true);
  hoverUploader = signal<boolean>(false);
  loadedRecipe = signal<boolean>(false);
  ingredients = signal<FormControl[]>([]);
  ingredientInput = signal<string>('');
  isMobile = computed(() => this.screenSize.isMobile());

  constructor(private screenSize: ScreenSizeService) {}

  addIngredient(): void {
    const newIngredient = new FormControl(this.ingredientInput(), {
      nonNullable: true
    });
    this.ingredients.set([...this.ingredients(), newIngredient]);
    this.ingredientInput.set('');
  }
}
