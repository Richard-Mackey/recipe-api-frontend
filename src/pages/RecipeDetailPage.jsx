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

  const formatCategory = (category) => {
    if (category) {
      const categoryFirstLetter = category
        .toLowerCase()
        .charAt(0)
        .toUpperCase();

      const categoryRestOfWord = category.toLowerCase().slice(1);
      const categoryCaseFixed = categoryFirstLetter + categoryRestOfWord;
      return categoryCaseFixed;
    }
    return "No category";
  };
  const sourceFirstLetter = recipe.source.toLowerCase().charAt(0).toUpperCase();
  const sourceRestOfWord = recipe.source.toLowerCase().slice(1);
  const sourceCaseFixed = sourceFirstLetter + sourceRestOfWord;

  return (
    <div className="m-5">
      <button
        type="button"
        className="btn btn-light"
        onClick={() => navigate("/")}
      >
        Back to Recipes
      </button>

      <h1 className="text-center mb-5">{recipe.name}</h1>
      <div className="row align-items-stretch mb-3">
        <div className="col-md-4 d-flex">
          <ul className="list-group ms-2 flex-grow-1">
            {recipe.description && (
              <li className="list-group-item">
                Description: {recipe.description}
              </li>
            )}
            <li className="list-group-item">Servings: {recipe.servings}</li>
            <li className="list-group-item">
              Preparation time: {recipe.prepTimeMinutes} minutes
            </li>
            <li className="list-group-item">
              Category: {formatCategory(recipe.category)}
            </li>
            <li className="list-group-item">Source: {sourceCaseFixed}</li>
          </ul>
        </div>
        <div className="col-md-8 text-center">
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              className="img-fluid"
              alt={recipe.name}
            />
          )}
        </div>
      </div>
      <div className="justify-content-center">
        <h3>Ingredients:</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{recipe.ingredientsText}</p>

        <h3>Instructions:</h3>
        <p style={{ whiteSpace: "pre-wrap" }}>{recipe.instructions}</p>
      </div>
    </div>
  );
};
