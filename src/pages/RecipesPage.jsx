import { RecipeList } from "../components/recipes/RecipeList";

export const RecipesPage = () => {
  return (
    <div>
      <h1 className="text-center m-4">My Recipes</h1>

      <RecipeList />
    </div>
  );
};
