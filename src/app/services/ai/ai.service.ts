import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GeneratedRecipeInterface } from '../../interfaces/ai.interface';
import { BaseRecipeInterface } from '../../interfaces/recipes.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  #http = inject(HttpClient);

  generateRecipe(ingredients: string[]): Observable<BaseRecipeInterface> {
    const body = {
      ingredients,
    };
    return this.#http
      .post<GeneratedRecipeInterface>(`${environment.apiUrl}/ai/recipe`, body)
      .pipe(
        map((resp) => {
          const formattedIngredients = resp.ingredients
            .map(
              (ingredient) =>
                `<p>-&nbsp;&nbsp;${ingredient.name},&nbsp;${ingredient.amount}</p>`,
            )
            .join('');

          const formattedSteps = resp.steps
            .map(
              (step, index) =>
                `<p><strong>${index + 1}.&nbsp;</strong>&nbsp;${step.description}</p>`,
            )
            .join('');

          const description = `
            <h2>Ingredientes:</h2>
            <p><strong>&nbsp;</strong>&nbsp;</p>
            ${formattedIngredients}
            <h2></h2>
            <h2>Pasos:</h2>
            <p></p>
            ${formattedSteps}
          `;

          return {
            name: resp.title,
            description,
            summary: resp.summary
          };
        }),
      );
  }
}
