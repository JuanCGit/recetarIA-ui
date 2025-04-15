import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { Router, RouterLink } from '@angular/router';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import {UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.component.html',
  styleUrl: './library.page.component.scss',
  standalone: true,
  imports: [CustomInputComponent, RouterLink, UpperCasePipe],
})
export class LibraryPageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #router = inject(Router);
  #recipesService = inject(RecipesService);
  recipesResource = rxResource({
    loader: () => {
      return this.#recipesService.getRecipes();
    },
  });
  recipesInput = signal<string>('');
  filteredRecipes = computed(() => {
    return (this.recipesResource.value() ?? []).filter((recipe) =>
      recipe.name.toLowerCase().includes(this.recipesInput().toLowerCase()),
    );
  });

  navigateToRecipe(recipeId: number) {
    this.#router.navigate(['library', recipeId]);
  }
}
