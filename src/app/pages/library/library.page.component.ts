import {Component, computed, signal, WritableSignal} from '@angular/core';
import {CustomInputComponent} from "../../components/custom-input/custom-input.component";
import {ScreenSizeService} from '../../../services/screen-size.service';
import {IRecipeCard} from './interfaces/recipe-card.interface';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.component.html',
  styleUrl: './library.page.component.scss',
  standalone: true,
  imports: [CustomInputComponent, RouterLink],
})
export class LibraryPageComponent {
  isMobile = computed(() => this.screenSize.isMobile());
  recipesMock: IRecipeCard[] = [{
    recipeId: 987,
    name: 'string',
    photo: 'https://thispersondoesnotexist.com/'
  },{
    recipeId: 987,
    name: 'string',
    photo: 'https://thispersondoesnotexist.com/'
  },{
    recipeId: 987,
    name: 'string',
    photo: 'https://thispersondoesnotexist.com/'
  },{
    recipeId: 987,
    name: 'string',
    photo: 'https://thispersondoesnotexist.com/'
  },{
    recipeId: 987,
    name: 'string',
    photo: 'https://thispersondoesnotexist.com/'
  }];
  recipes: WritableSignal<IRecipeCard[]> = signal([
    ...this.recipesMock,
    ...this.recipesMock,
  ]);
  recipesInput = signal<string>('');
  filteredRecipes = computed(() => {
    return this.recipes().filter((recipe) =>
      recipe.name.toLowerCase().includes(this.recipesInput().toLowerCase()),
    );
  });

  constructor(private screenSize: ScreenSizeService, private router: Router) {}

  navigateToRecipe(recipeId: number) {
    this.router.navigate(['library', recipeId]);
  }
}
