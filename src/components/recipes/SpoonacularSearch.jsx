import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export const SpoonacularSearch = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const performSearch = async () => {
      setError("");
      setLoading(true);
      try {
        const data = await searchSpoonacular(query);
        setResults(data.results || []);
        console.log(data.results);
      } catch (err) {
        setError(err.message || "Search failed");
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      performSearch();
    }
  }, [query]);

  const navigate = useNavigate();
  const { searchSpoonacular, saveSpoonacularRecipe } =
    useContext(RecipeContext);

  const handleSave = async (spoonacularId) => {
    try {
      const savedRecipe = await saveSpoonacularRecipe(spoonacularId);
      console.log("Saved recipe", savedRecipe);
      navigate(`/recipes/${savedRecipe.id}`);
    } catch (err) {
      console.error("Failed to save recipe", err);
    }
  };

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {results.length > 0 && (
        <div className=" row m-3">
          <h2>Search Results ({results.length})</h2>
          {results.map((recipe) => (
            <div
              className=" col-12 col-md-6 col-lg-4 mb-3 mt-5 justify-content-center"
              key={recipe.id}
            >
              <div className="card p-4 rounded shadow d-flex h-100">
                <div className="flex-grow-1 text-center">
                  <img src={recipe.image} alt={recipe.title} />
                  <h3>{recipe.title}</h3>
                </div>
                <button
                  type="button"
                  className="btn btn-light m-3"
                  onClick={() => handleSave(recipe.id)}
                >
                  Save to Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
