import { Component, signal, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { IngredientList } from './components/ingredient-list/ingredient-list';
import { Router } from '@angular/router';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { AIService } from '../../../../services/ai/ai.service';
import {TranslatePipe} from '@ngx-translate/core';

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
    TranslatePipe,
  ],
})
export class AiChefPageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #router = inject(Router);
  #recipesService = inject(RecipesService);
  #aiService = inject(AIService);

  writeIngredients = signal<boolean>(true);
  hoverUploader = signal<boolean>(false);
  ingredients = signal<FormControl[]>([]);
  ingredientInput = signal<string>('');

  addIngredient(): void {
    const newIngredient = new FormControl(this.ingredientInput(), {
      nonNullable: true,
    });
    this.ingredients.set([...this.ingredients(), newIngredient]);
    this.ingredientInput.set('');
  }

  generateRecipe() {
    this.#aiService
      .generateRecipe(this.ingredients().map((control) => control.value))
      .subscribe((resp) => {
        this.#recipesService.generatedRecipe.set(resp);
        this.#router.navigateByUrl('/create');
      });
  }
}
