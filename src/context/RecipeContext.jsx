import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // doesn't immeditaly start fetch
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // retrieve token from AuthContext
  const { token } = useContext(AuthContext);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8082/recipes?page=${currentPage}&size=20&sort=id,desc`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }
      const data = await response.json();

      setRecipes(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchRecipes();
    }
  }, [currentPage, token]);

  const createRecipe = async (recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8082/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create recipe: ${response.status}`);
      }
      const data = await response.json();
      await fetchRecipes();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecipe = async (recipeId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8082/recipes/${recipeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete recipe: ${response.status}`);
      }
      await fetchRecipes();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipeById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8082/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch recipe: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRecipe = async (id, recipeData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8082/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update recipe: ${response.status}`);
      }
      const data = await response.json();
      await fetchRecipes();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchSpoonacular = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8082/recipes/search/spoonacular?query=${query}&number=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch recipes from Spoonacular: ${response.status}`
        );
      }
      const data = await response.json();

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveSpoonacularRecipe = async (spoonacularId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8082/recipes/spoonacular/${spoonacularId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to save recipe: ${response.status}`);
      }
      const data = await response.json();
      await fetchRecipes();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const previousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const value = {
    recipes,
    loading,
    error,
    fetchRecipes,
    createRecipe,
    deleteRecipe,
    fetchRecipeById,
    updateRecipe,
    searchSpoonacular,
    saveSpoonacularRecipe,
    currentPage,
    totalPages,
    nextPage,
    previousPage,
    goToPage,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};
