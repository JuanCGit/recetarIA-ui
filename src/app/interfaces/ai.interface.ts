export interface GeneratedRecipeInterface {
  title: string;
  ingredients: IngredientInterface[];
  steps: StepInterface[];
}

interface IngredientInterface {
  name: string;
  amount: string;
}

interface StepInterface {
  description: string;
}
