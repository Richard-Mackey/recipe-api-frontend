import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useNavigate } from "react-router-dom";

export const RecipeCard = ({ recipe }) => {
  const { deleteRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  return (
    <div
      style={{
        border: "2px solid #ccc",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        backgroundColor: "#3C61C7",
      }}
    >
      <h2>{recipe.name}</h2>
      <button
        onClick={() => {
          if (confirm("Are you sure you want to delete?")) {
            deleteRecipe(recipe.id);
          }
        }}
      >
        Delete recipe
      </button>
      <button onClick={() => navigate(`/recipes/edit/${recipe.id}`)}>
        Edit recipe
      </button>
      <p>{recipe.description}</p>
      <p>Category: {recipe.category}</p>
      <p>Source: {recipe.source}</p>
    </div>
  );
};
