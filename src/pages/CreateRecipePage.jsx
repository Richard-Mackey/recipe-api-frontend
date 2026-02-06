import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RecipeContext } from "../context/RecipeContext";

export const CreateRecipePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("");
  const [servings, setServings] = useState("");
  const [category, setCategory] = useState("BREAKFAST");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { createRecipe } = useContext(RecipeContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const recipeData = {
      name,
      description,
      ingredientsText,
      instructions,
      prepTimeMinutes: Number(prepTimeMinutes),
      servings: Number(servings),
      category,
    };

    try {
      await createRecipe(recipeData);
      setSuccess(true);
      setName("");
      setDescription("");
      setIngredientsText("");
      setInstructions("");
      setPrepTimeMinutes("");
      setServings("");
      setCategory("BREAKFAST");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <h2>Recipe created</h2>

        <button onClick={() => navigate("/")}>Back to recipe list</button>
      </div>
    );
  }

  return (
    <div className="m-5">
      <h2 className="text-center">Create a recipe</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="input-group m-3">
          <span className="input-group-text col-4" id="recipe-name">
            Name
          </span>

          <input
            type="text"
            className="form-control"
            aria-label="recipe name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group m-3">
          <span className="input-group-text col-4">Description</span>
          <textarea
            className="form-control"
            aria-label="recipe description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group m-3">
          <span className="input-group-text col-4">Ingredients</span>
          <textarea
            className="form-control"
            aria-label="recipe ingredients"
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group m-3">
          <span className="input-group-text col-4">Instructions</span>
          <textarea
            className="form-control"
            aria-label="recipe instruction"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div className="input-group m-3">
          <span className="input-group-text col-4" id="recipe-preparation-time">
            Preparation time (minutes):
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="recipe preparation time"
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group m-3">
          <span className="input-group-text col-4" id="servings">
            Servings
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="servings"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            disabled={loading}
            min="1"
            max="20"
            required
          />
        </div>

        <div className="input-group m-3">
          <select
            className="form-select "
            aria-label="Select category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          >
            <option selected>Category</option>
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="DESSERT">Dessert</option>
          </select>
        </div>

        <button className="btn btn-light m-3" type="submit" disabled={loading}>
          {loading ? "Saving recipe..." : "Save recipe"}
        </button>
        <button
          type="button"
          className="btn btn-light m-3"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
