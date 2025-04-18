export interface RecipeInterface {
  id: number;
  name: string;
  description: string;
  userId: number;
  isAuthor: boolean;
}

export interface BaseRecipeInterface {
  name: string;
  description: string;
}
