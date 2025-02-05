import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.component.html',
  styleUrl: './create.page.component.scss',
  standalone: true,
  imports: [Button, CustomInputComponent, Editor, FileUpload, FormsModule],
})
export class CreatePageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #recipesService = inject(RecipesService);
  #router = inject(Router);

  generatedRecipe = computed(() => this.#recipesService.generatedRecipe());
  recipeName = linkedSignal(
    () => this.#recipesService.generatedRecipe()?.name ?? '',
  );
  recipeDescription = linkedSignal(
    () => this.#recipesService.generatedRecipe()?.recipe ?? '',
  );

  createRecipe() {
    this.#recipesService
      .createRecipe({
        name: this.recipeName(),
        description: this.recipeDescription(),
      })
      .subscribe((recipe) => this.#router.navigate(['/library/', recipe.id]));
  }
}
