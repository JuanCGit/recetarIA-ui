export interface GeneratedRecipeInterface {
  title: string;
  ingredients: IngredientInterface[];
  steps: StepInterface[];
  summary: string;
}

interface IngredientInterface {
  name: string;
  amount: string;
}

interface StepInterface {
  description: string;
}
