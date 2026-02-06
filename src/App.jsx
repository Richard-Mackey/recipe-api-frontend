import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { RecipeProvider } from "./context/RecipeContext";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./pages/HomePage";
import { RecipesPage } from "./pages/RecipesPage";
import { CreateRecipePage } from "./pages/CreateRecipePage";
import { EditRecipePage } from "./pages/EditRecipePage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { LoginForm } from "./components/auth/LoginForm";
import { SpoonacularSearch } from "./components/recipes/SpoonacularSearch";
import { RegisterForm } from "./components/auth/RegisterForm";

function AppContent() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user && <Navigation />} {/* Show nav only when logged in */}
      <Routes>
        <Route path="/" element={!user ? <LoginForm /> : <HomePage />} />
        <Route
          path="/register"
          element={!user ? <RegisterForm /> : <HomePage />}
        />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create" element={<CreateRecipePage />} />
        <Route path="/recipes/edit/:id" element={<EditRecipePage />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        <Route path="/search" element={<SpoonacularSearch />} />
      </Routes>
    </div>
  );
}

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
