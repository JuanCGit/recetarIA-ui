import {
  Component,
  computed,
  inject,
  linkedSignal,
  OnDestroy,
} from '@angular/core';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../../../components/custom-input/custom-input.component';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ScreenSizeService } from '../../../../services/screen/screen-size.service';
import { RecipesService } from '../../../../services/recipes/recipes.service';
import { Router } from '@angular/router';
import { FloatLabel } from 'primeng/floatlabel';
import { Textarea } from 'primeng/textarea';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.component.html',
  styleUrl: './create.page.component.scss',
  standalone: true,
  imports: [
    Button,
    CustomInputComponent,
    Editor,
    FileUpload,
    FormsModule,
    FloatLabel,
    Textarea,
    TranslatePipe,
  ],
})
export class CreatePageComponent implements OnDestroy {
  protected readonly screenSize = inject(ScreenSizeService);
  #recipesService = inject(RecipesService);
  #router = inject(Router);

  generatedRecipe = computed(() => this.#recipesService.generatedRecipe());
  recipeName = linkedSignal(
    () => this.#recipesService.generatedRecipe()?.name ?? '',
  );
  recipeDescription = linkedSignal(
    () => this.#recipesService.generatedRecipe()?.description ?? '',
  );
  recipeSummary = linkedSignal(
    () => this.#recipesService.generatedRecipe()?.summary ?? '',
  );

  ngOnDestroy() {
    this.#recipesService.generatedRecipe.set(undefined);
  }

  createRecipe() {
    this.#recipesService
      .createRecipe({
        name: this.recipeName(),
        description: this.recipeDescription(),
        summary: this.recipeSummary(),
      })
      .subscribe((recipe) => {
        this.#router.navigate(['/library/', recipe.id]);
      });
  }
}
