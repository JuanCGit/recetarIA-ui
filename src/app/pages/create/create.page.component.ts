import { Component, computed, linkedSignal, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import {FormControl, FormsModule} from '@angular/forms';
import { ScreenSizeService } from '../../../services/screen-size.service';
import { recipeService } from '../../services/recipes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.component.html',
  styleUrl: './create.page.component.scss',
  standalone: true,
  imports: [Button, CustomInputComponent, Editor, FileUpload, FormsModule],
})
export class CreatePageComponent {
  loadedRecipe = signal<boolean>(true);
  ingredients = signal<FormControl[]>([]);
  ingredientInput = signal<string>('');
  isMobile = computed(() => this.screenSize.isMobile());
  generatedRecipe = computed(() => this.recipeService.generatedRecipe());
  recipeName = linkedSignal(() => this.recipeService.generatedRecipe()?.name ?? '');
  recipeDescription = linkedSignal(() => this.recipeService.generatedRecipe()?.recipe ?? '');


  constructor(private screenSize: ScreenSizeService, private recipeService: recipeService) {
  }

  addIngredient(): void {
    const newIngredient = new FormControl(this.ingredientInput(), {
      nonNullable: true,
    });
    this.ingredients.set([...this.ingredients(), newIngredient]);
    this.ingredientInput.set('');
  }
}
