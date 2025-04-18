import { Component, Input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.html',
  styleUrl: './ingredient-list.scss',
  standalone: true,
  imports: [ReactiveFormsModule, InputText, TranslatePipe],
})
export class IngredientList {
  @Input() ingredients = signal<FormControl[]>([]);

  removeIngredient(index: number): void {
    const updatedIngredients = [...this.ingredients()];
    updatedIngredients.splice(index, 1);
    this.ingredients.set(updatedIngredients);
  }
}
