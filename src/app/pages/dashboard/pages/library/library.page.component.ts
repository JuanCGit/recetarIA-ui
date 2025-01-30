import {
  Component,
  computed,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { IRecipeCard } from './interfaces/recipe-card.interface';
import { Router, RouterLink } from '@angular/router';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.component.html',
  styleUrl: './library.page.component.scss',
  standalone: true,
  imports: [CustomInputComponent, RouterLink],
})
export class LibraryPageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #router = inject(Router);

  recipesMock: IRecipeCard[] = [
    {
      recipeId: 111,
      name: 'Macarrones Boloñesa',
      photo: 'https://thispersondoesnotexist.com/',
    },
    {
      recipeId: 222,
      name: 'Arroz al horno',
      photo: 'https://thispersondoesnotexist.com/',
    },
    {
      recipeId: 333,
      name: 'Arroz a la cubana',
      photo: 'https://thispersondoesnotexist.com/',
    },
    {
      recipeId: 444,
      name: 'Brioche',
      photo: 'https://thispersondoesnotexist.com/',
    },
    {
      recipeId: 555,
      name: 'Pastel',
      photo: 'https://thispersondoesnotexist.com/',
    },
  ];
  recipes: WritableSignal<IRecipeCard[]> = signal([...this.recipesMock]);
  recipesInput = signal<string>('');
  filteredRecipes = computed(() => {
    return this.recipes().filter((recipe) =>
      recipe.name.toLowerCase().includes(this.recipesInput().toLowerCase()),
    );
  });

  navigateToRecipe(recipeId: number) {
    this.#router.navigate(['library', recipeId]);
  }
}
