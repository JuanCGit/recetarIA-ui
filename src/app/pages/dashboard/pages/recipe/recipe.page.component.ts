import {
  Component,
  input,
  linkedSignal,
  resource,
  signal,
  inject,
  computed,
} from '@angular/core';
import { Editor } from 'primeng/editor';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { firstValueFrom } from 'rxjs';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { RecipeInterface } from '../../../../interfaces/recipes.interfaces';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.component.html',
  styleUrl: './recipe.page.component.scss',
  standalone: true,
  imports: [Editor, FormsModule, Button, CustomInputComponent, TranslatePipe],
})
export class RecipePageComponent {
  protected readonly screenSize = inject(ScreenSizeService);
  #translate = inject(TranslateService);
  #recipesService = inject(RecipesService);
  #toastService = inject(MessageService);
  #confirmationService = inject(ConfirmationService);
  #router = inject(Router);

  recipeId = input<number | undefined>(undefined);
  recipeResource = resource({
    request: () => ({ recipeId: this.recipeId() }),
    loader: async ({ request }) => {
      return firstValueFrom(this.#recipesService.getRecipe(request.recipeId));
    },
  });
  recipeName = linkedSignal(() => this.recipeResource.value()?.name ?? '');
  recipeDescription = linkedSignal(
    () => this.recipeResource.value()?.description ?? '',
  );
  descriptionNotChanged = computed(() => {
    return (
      this.recipeDescription().replace(/(\s*&nbsp;\s*|\s*\n\s*|\s+)/g, '') ===
      this.recipeResource
        .value()
        ?.description.replace(/(\s*&nbsp;\s*|\s*\n\s*|\s+)/g, '')
    );
  });
  isAuthor = linkedSignal(() => this.recipeResource.value()?.isAuthor ?? '');
  isEditing = signal<boolean>(false);

  editRecipe() {
    if (!this.recipeResource.value()) return;
    this.#recipesService
      .editRecipe({
        ...this.recipeResource.value(),
        name: this.recipeName(),
        description: this.recipeDescription(),
      } as RecipeInterface)
      .subscribe((recipe) => {
        this.recipeName.set(recipe.name);
        this.recipeDescription.set(recipe.description);
        this.isAuthor.set(recipe.isAuthor);
        this.isEditing.set(false);
        this.#toastService.add({
          summary: this.#translate.instant('RECIPE.EDITED'),
          detail: this.#translate.instant('RECIPE.EDITED_SUCCESSFULLY'),
          severity: 'success',
          closable: false,
          life: 2000,
        });
      });
  }

  deleteRecipe() {
    this.#confirmationService.confirm({
      message: this.#translate.instant('RECIPE.WANT_TO_DELETE'),
      header: this.#translate.instant('RECIPE.DELETE'),
      icon: 'pi pi-trash',
      acceptLabel: this.#translate.instant('COMMON.DELETE'),
      rejectLabel: this.#translate.instant('COMMON.CANCEL'),
      acceptButtonStyleClass: 'delete-btn',
      accept: () => {
        this.#recipesService
          .deleteRecipe(Number(this.recipeId()))
          .subscribe(() => {
            this.#router.navigateByUrl('/library');
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
