export interface IRecipe {
  id: number;
  name: string;
  description: string;
  userId: number;
  isAuthor: boolean;
}

export interface IAIRecipe {
  name: string;
  recipe: string;
}

export interface ICreateRecipe {
  name: string;
  description: string;
}
