import { useState, useContext } from "react";
import { RecipeContext } from "../../context/RecipeContext";

export const SpoonacularSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { searchSpoonacular, saveSpoonacularRecipe } =
    useContext(RecipeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await searchSpoonacular(searchQuery);
      setResults(data.results || []);
    } catch (err) {
      setError(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (spoonacularId) => {
    try {
      const savedRecipe = await saveSpoonacularRecipe(spoonacularId);
      console.log("Saved recipe", savedRecipe);
    } catch (err) {
      console.error("Failed to save recipe", err);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Search recipes:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Searching" : "Search"}
        </button>
      </form>
      {results.length > 0 && (
        <div>
          <h2>Search Results ({results.length})</h2>
          {results.map((recipe) => (
            <div key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>

              <button onClick={() => handleSave(recipe.id)}>
                Save to Collection
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
