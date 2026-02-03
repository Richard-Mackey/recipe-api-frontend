import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = () => {
  const { recipes, loading, error, fetchRecipes } = useContext(RecipeContext);

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (recipes === null)
    return (
      <div>
        Click 'Load recipes' to see your saved recipes
        <button onClick={fetchRecipes}>Fetch Recipes</button>
      </div>
    );
  if (recipes.length === 0) return <div>No saved recipes. Create one!</div>;

  return (
    <div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
