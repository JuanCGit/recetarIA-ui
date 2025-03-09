export interface RecipeInterface {
  id: number;
  name: string;
  description: string;
  userId: number;
  isAuthor: boolean;
  summary: string;
}

export interface BaseRecipeInterface {
  name: string;
  description: string;
  summary: string;
}
