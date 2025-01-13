import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ai-chef',
    loadComponent: () =>
      import('./pages/ai-chef/ai-chef.page.component').then(
        (c) => c.AiChefPageComponent,
      ),
  },
  {
    path: 'library',
    loadComponent: () =>
      import('./pages/library/library.page.component').then(
        (c) => c.LibraryPageComponent,
      ),
  },
  {
    path: 'library/:recipeId',
    loadComponent: () =>
      import('./pages/recipe/recipe.page.component').then(
        (c) => c.RecipePageComponent,
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create/create.page.component').then(
        (c) => c.CreatePageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'ai-chef',
  },
];
