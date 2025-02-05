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
  isEditing = signal<boolean>(false);
}
