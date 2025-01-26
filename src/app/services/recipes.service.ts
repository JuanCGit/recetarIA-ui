import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IGeneratedRecipe } from '../interfaces/recipes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class recipeService {
  generatedRecipe = signal<IGeneratedRecipe | undefined>(undefined);

  constructor(private http: HttpClient) {}

  generateRecipe(ingredients: string[]): Observable<IGeneratedRecipe> {
    const mockList = ingredients.map((ingredient) => `<li>${ingredient}</li>`);
    return of({
      name: 'Macarrones',
      recipe: `<h1>Recipe Generated:</h1><ul>${mockList.join('')}</ul>`,
    });
  }
}
