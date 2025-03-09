import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRecipeInterface, RecipeInterface } from '../../interfaces/recipes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  #recipesUrl = `${environment.apiUrl}/recipes/`;
  #http = inject(HttpClient);

  generatedRecipe = signal<BaseRecipeInterface | undefined>(undefined);

  getRecipe(recipeId?: number): Observable<RecipeInterface> {
    return this.#http.get<RecipeInterface>(`${this.#recipesUrl}${recipeId ?? 0}`);
  }

  getRecipes(): Observable<RecipeInterface[]> {
    return this.#http.get<RecipeInterface[]>(this.#recipesUrl);
  }

  createRecipe(recipe: BaseRecipeInterface): Observable<RecipeInterface> {
    return this.#http.post<RecipeInterface>(this.#recipesUrl, recipe);
  }

  editRecipe(editedRecipe: RecipeInterface) {
    const editedRecipeUrl = `${this.#recipesUrl}${editedRecipe.id}`;
    return this.#http.put<RecipeInterface>(editedRecipeUrl, editedRecipe);
  }

  deleteRecipe(deleteRecipeId: number) {
    const deletedRecipeUrl = `${this.#recipesUrl}${deleteRecipeId}`;
    return this.#http.delete<void>(deletedRecipeUrl);
  }
}
