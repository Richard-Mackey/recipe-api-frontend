import { useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import breakfast from "../../assets/Breakfast.jpg";
import lunch from "../../assets/Lunch.jpg";
import dinner from "../../assets/Dinner.jpg";
import dessert from "../../assets/Dessert.jpg";
import generic from "../../assets/Generic.jpg";

const categoryImages = {
  BREAKFAST: breakfast,
  LUNCH: lunch,
  DINNER: dinner,
  DESSERT: dessert,
  Generic: generic,
};

const categoryDescription = {
  SPOONACULAR: "Spoonacular",
  USER_CREATED: "User created",
};

export const RecipeCard = ({ recipe }) => {
  const { deleteRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();
  const imagePath = recipe.category ? categoryImages[recipe.category] : generic;
  const sourcePath = categoryDescription[recipe.source] || "Unknown";

  return (
    <div
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "10px",
        margin: "10px",
        borderRadius: "5px",
        backgroundColor: "#38220f",
        cursor: "pointer",
      }}
    >
      <div className="flex-grow-1">
        <div className="d-flex justify-content-center ">
          <img
            src={imagePath}
            alt="Category image"
            className="category-image mt-4 mb-3"
          />
        </div>
        <h2>{recipe.name}</h2>

        <p>{recipe.description}</p>

        <p>Source: {sourcePath}</p>
      </div>

      <button
        type="button"
        className="btn btn-light ms-3 me-3"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/recipes/edit/${recipe.id}`);
        }}
      >
        Edit recipe
      </button>
      <button
        type="button"
        className="btn btn-light m-3"
        onClick={(e) => {
          e.stopPropagation();
          if (confirm("Are you sure you want to delete?")) {
            deleteRecipe(recipe.id);
          }
        }}
      >
        Delete recipe
      </button>
    </div>
  );
};
