import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAIRecipe, IRecipe } from '../../interfaces/recipes.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
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
    return this.#http.get<IRecipe>(
      `${environment.apiUrl}/recipes/${recipeId ?? 0}`,
    );
  }
}
