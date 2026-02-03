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
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Ingredients:</label>
          <textarea
            value={ingredientsText}
            onChange={(e) => setIngredientsText(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Instructions:</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Preparation time (minutes):</label>
          <input
            type="number"
            value={prepTimeMinutes}
            onChange={(e) => setPrepTimeMinutes(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label>Servings:</label>
          <input
            type="number"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            disabled={loading}
            min="1"
            max="20"
            required
          />
        </div>

        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={loading}
            required
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="DESSERT">Dessert</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving recipe..." : "Save recipe"}
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit" disabled={loading}>
          {loading ? "Saving recipe..." : "Save recipe"}
        </button>
      </form>
    </div>
  );
};
