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
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.component.html',
  styleUrl: './library.page.component.scss',
  standalone: true,
  imports: [CustomInputComponent, RouterLink, UpperCasePipe, TranslatePipe],
})
export class LibraryPageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #router = inject(Router);
  #confirmationService = inject(ConfirmationService);
  #translate = inject(TranslateService);
  #recipesService = inject(RecipesService);
  #toastService = inject(MessageService);
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

  navigateToEditRecipe(recipeId: number, event: MouseEvent) {
    event.stopPropagation();
    this.#router.navigate(['library', recipeId], {queryParams: {editing: true}});
  }

  deleteRecipe(recipeId: number, event: MouseEvent) {
    event.stopPropagation();
    this.#confirmationService.confirm({
      message: this.#translate.instant('RECIPE.WANT_TO_DELETE'),
      header: this.#translate.instant('RECIPE.DELETE'),
      icon: 'pi pi-trash',
      acceptLabel: this.#translate.instant('COMMON.DELETE'),
      rejectLabel: this.#translate.instant('COMMON.CANCEL'),
      acceptButtonStyleClass: 'delete-btn',
      accept: () => {
        this.#recipesService
          .deleteRecipe(recipeId)
          .subscribe(() => {
            this.recipesResource.reload();
            this.#toastService.add({
              summary: this.#translate.instant('RECIPE.DELETED'),
              detail: this.#translate.instant('RECIPE.DELETED_SUCCESSFULLY'),
              severity: 'info',
              closable: false,
              life: 1000,
            });
          });
      },
    });
  }

}
