import { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../../context/RecipeContext";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = () => {
  const {
    recipes,
    loading,
    error,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
  } = useContext(RecipeContext);

  const [savedFilter, setSavedFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  if (loading) return <div>Loading recipes...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipes || recipes.length === 0)
    return <div>No saved recipes. Create one!</div>;

  const handleSavedFilterChange = (e) => {
    setSavedFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSource =
      savedFilter === "ALL" || recipe.source === savedFilter;
    const matchesCategory =
      categoryFilter === "ALL" || recipe.category === categoryFilter;
    return matchesSource && matchesCategory;
  });

  return (
    <div className="m-3">
      <div className="me-5 ms-3">
        <select
          className="form-select m-3"
          aria-label="Select recipes from user or spoonacular "
          value={savedFilter}
          onChange={handleSavedFilterChange}
        >
          <option value="ALL">All Recipes</option>
          <option value="USER_CREATED">My Recipes</option>
          <option value="SPOONACULAR">Saved from Spoonacular</option>
        </select>

        <select
          className="form-select m-3"
          aria-label="Select category"
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
        >
          <option value="ALL">All Categories</option>
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="DESSERT">Dessert</option>
        </select>
      </div>
      <div className="row ">
        {filteredRecipes.map((recipe) => (
          <div className="d-flex col-12 col-md-6 col-lg-3 mb-3 mt-5 text-center">
            <RecipeCard key={recipe.id} recipe={recipe} />
          </div>
        ))}
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary m-3"
          onClick={previousPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          type="button"
          className="btn btn-primary m-3"
          onClick={nextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
