import { Component, computed, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { Editor } from 'primeng/editor';
import { FileUpload } from 'primeng/fileupload';
import { FormControl } from '@angular/forms';
import { ScreenSizeService } from '../../../services/screen-size.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.component.html',
  styleUrl: './create.page.component.scss',
  standalone: true,
  imports: [Button, CustomInputComponent, Editor, FileUpload],
})
export class CreatePageComponent {
  writeIngredients = signal<boolean>(true);
  hoverUploader = signal<boolean>(false);
  loadedRecipe = signal<boolean>(true);
  ingredients = signal<FormControl[]>([]);
  ingredientInput = signal<string>('');
  isMobile = computed(() => this.screenSize.isMobile());

  constructor(private screenSize: ScreenSizeService) {}

  addIngredient(): void {
    const newIngredient = new FormControl(this.ingredientInput(), {
      nonNullable: true,
    });
    this.ingredients.set([...this.ingredients(), newIngredient]);
    this.ingredientInput.set('');
  }
}
