import {
  Component,
  computed,
  input,
  linkedSignal,
  resource,
  signal,
  inject,
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { firstValueFrom } from 'rxjs';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { IRecipe } from '../../../../interfaces/recipes.interfaces';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
  imports: [Editor, FormsModule, Button, CustomInputComponent],
})
export class RecipePageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #recipesService = inject(RecipesService);
  #toastService = inject(MessageService);

  recipeId = input<number | undefined>(undefined);
  recipeResource = resource({
    request: () => ({ recipeId: this.recipeId() }),
    loader: async ({ request }) => {
      return firstValueFrom(this.#recipesService.getRecipe(request.recipeId));
    },
  });
  recipeName = linkedSignal(() => this.recipeResource.value()?.name ?? '');
  recipeDescription = linkedSignal(
    () => this.recipeResource.value()?.description ?? '',
  );
  isAuthor = linkedSignal(() => this.recipeResource.value()?.isAuthor ?? '');
  isEditing = signal<boolean>(false);

  editRecipe() {
    if (!this.recipeResource.value()) return;
    this.#recipesService
      .editRecipe({
        ...this.recipeResource.value(),
        name: this.recipeName(),
        description: this.recipeDescription(),
      } as IRecipe)
      .subscribe((recipe) => {
        this.recipeName.set(recipe.name);
        this.recipeDescription.set(recipe.description);
        console.log(recipe, 'HOLA');

        this.isAuthor.set(recipe.isAuthor);
        this.isEditing.set(false);
        this.#toastService.add({
          summary: 'Recipe edited',
          detail: 'The recipe has been edited successfully',
          severity: 'success',
          closable: false,
          life: 2000,
        });
      });
  }
}
