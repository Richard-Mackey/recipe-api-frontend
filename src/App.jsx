import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RecipeProvider } from "./context/RecipeContext";
import { LoginForm } from "./components/auth/LoginForm";
import { RecipeList } from "./components/recipes/RecipeList";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { SpoonacularSearch } from "./components/recipes/SpoonacularSearch";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";

// Inside App.jsx, BEFORE the App component:

const AppContent = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipe App</h1>

      {user && (
        <div style={{ marginBottom: "20px" }}>
          <span>Welcome, {user.username}! </span>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginForm />
            ) : (
              <>
                <button onClick={() => navigate("/recipes/create")}>
                  Create Recipe
                </button>
                <h1>My Recipes</h1>
                <SpoonacularSearch />
                <RecipeList />
              </>
            )
          }
        />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/recipes/edit/:id" element={<EditRecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <RecipeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;
