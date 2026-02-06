import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="m-5">
      <h1>Welcome back, {user?.username}!</h1>
      <p>Click on my recipes, to view your saved recipes.</p>
      <p>
        View recipes that other users have created. Don't like them? Delete
        them! They will only disappear from your own saved recipes.
      </p>
      <p>
        Browse recipes on Spoonacular. Enter an ingredient into the search and
        download them for later, edit them and share them!
      </p>
    </div>
  );
};
