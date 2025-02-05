export interface IRecipe {
  id: number;
  name: string;
  description: string;
  userId: number;
}

export interface IAIRecipe {
  name: string;
  recipe: string;
}

export interface ICreateRecipe {
  name: string;
  description: string;
}
