import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RecipeContext } from "../context/RecipeContext";
import { AuthContext } from "../context/AuthContext";

export const RecipeDetailPage = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);

  const { fetchRecipeById } = useContext(RecipeContext);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;

    const loadRecipe = async () => {
      const data = await fetchRecipeById(id);
      setRecipe(data);
    };

    loadRecipe();
  }, [id, token]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Recipes</button>

      <h1>{recipe.name}</h1>

      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.name} />}

      <p>Description: {recipe.description}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Preparation time: {recipe.prepTimeMinutes} minutes</p>
      <p>Category: {recipe.category}</p>
      <p>Source: {recipe.source}</p>

      <h3>Ingredients:</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{recipe.ingredientsText}</p>

      <h3>Instructions:</h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
    </div>
  );
};
