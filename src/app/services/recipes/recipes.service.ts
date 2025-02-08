import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  IAIRecipe,
  ICreateRecipe,
  IRecipe,
} from '../../interfaces/recipes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  #recipesUrl = `${environment.apiUrl}/recipes/`;
  #http = inject(HttpClient);

  generatedRecipe = signal<IAIRecipe | undefined>(undefined);

  generateRecipe(ingredients: string[]): Observable<IAIRecipe> {
    const mockList = ingredients.map((ingredient) => `<li>${ingredient}</li>`);
    return of({
      name: 'Macarrones',
      recipe: `<h1>Recipe Generated:</h1><ul>${mockList.join('')}</ul>`,
    });
  }

  getRecipe(recipeId?: number): Observable<IRecipe> {
    return this.#http.get<IRecipe>(`${this.#recipesUrl}${recipeId ?? 0}`);
  }

  getRecipes(): Observable<IRecipe[]> {
    return this.#http.get<IRecipe[]>(this.#recipesUrl);
  }

  createRecipe(recipe: ICreateRecipe): Observable<IRecipe> {
    return this.#http.post<IRecipe>(this.#recipesUrl, recipe);
  }

  editRecipe(editedRecipe: IRecipe) {
    const editedRecipeUrl = `${this.#recipesUrl}${editedRecipe.id}`;
    return this.#http.put<IRecipe>(editedRecipeUrl, editedRecipe);
  }

  deleteRecipe(deleteRecipeId: number) {
    const deletedRecipeUrl = `${this.#recipesUrl}${deleteRecipeId}`;
    return this.#http.delete<void>(deletedRecipeUrl);
  }
}
