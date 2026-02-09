import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { RecipeContext } from "../context/RecipeContext";

export const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const { searchSpoonacular, saveSpoonacularRecipe } =
    useContext(RecipeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Recipe Manager
        </NavLink>

        <form onSubmit={handleSubmit} className="d-flex" role="search">
          <input
            className="form-control me-2 col-3"
            type="search"
            placeholder="Search on Spoonacular"
            aria-label="Search on Spoonacular"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
            required
          />

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <button
            className="btn btn-outline-success d-none d-lg-inline-block"
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching" : "Search"}
          </button>
        </form>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/recipes" className="nav-link">
                My Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/recipes/create" className="nav-link">
                Create Recipe
              </NavLink>
            </li>

            <li className="nav-item">
              <button className="nav-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
