import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";
import AuthForm from "./components/AuthForm";
import "./App.css";

function App() {
  // State variables
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "http://localhost:5001/api";

  // Fetch user's own recipes
  const fetchUserRecipes = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/recipes`, {
        headers: { "x-auth-token": token },
      });
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      console.error(
        "Error fetching user recipes:",
        err.response?.data?.msg || err.message
      );
      setLoading(false);
    }
  }, [token]); // Only depends on token

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/auth/user`, {
        headers: { "x-auth-token": token },
      });
      setUser(res.data);
      fetchUserRecipes(); // This is now stable
    } catch (err) {
      console.error(
        "Error fetching user:",
        err.response?.data?.msg || err.message
      );
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [token, fetchUserRecipes]); // Both token and fetchUserRecipes are now stable dependencies

  // Fetch public recipes
  const fetchPublicRecipes = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/recipes/public`);
      setRecipes(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching public recipes:", err);
      setLoading(false);
    }
  };

  // Fetch recipes on app load
  useEffect(() => {
    fetchPublicRecipes();
    if (isAuthenticated) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, fetchUser]);

  // Add a new recipe
  const addRecipe = async (recipe) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/recipes`, recipe, {
        headers: { "x-auth-token": token },
      });
      setRecipes([...recipes, res.data]);
    } catch (err) {
      console.error(
        "Error adding recipe:",
        err.response?.data?.msg || err.message
      );
    }
  };

  // Select a recipe
  const selectRecipe = (index) => {
    setSelectedRecipeIndex(index);
  };

  // Handle user authentication
  const authenticateUser = async (credentials, isRegister) => {
    try {
      const url = isRegister
        ? `${API_BASE_URL}/auth/register`
        : `${API_BASE_URL}/auth/login`;

      const res = await axios.post(url, credentials);
      const { token, user } = res.data;

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("token", token);
    } catch (err) {
      console.error(
        "Error in authenticateUser:",
        err.response?.data?.msg || err.message
      );
      throw err;
    }
  };

  // Handle user logout
  const logout = () => {
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
    setRecipes([]);
    setSelectedRecipeIndex(null);
    localStorage.removeItem("token");
    fetchPublicRecipes();
  };

  return (
    <div className="App">
      <Header />
      {isAuthenticated ? (
        <>
          <div className="user-info">
            <p>Welcome, {user ? user.username : "User"}!</p>
            <button onClick={logout}>Logout</button>
          </div>
          <AddRecipeForm onAdd={addRecipe} />
        </>
      ) : (
        <>
          <p>Please log in to add your own recipes.</p>
          <AuthForm onAuth={authenticateUser} />
        </>
      )}
      {loading ? (
        <p>Loading recipes...</p>
      ) : (
        <div className="content">
          <RecipeList recipes={recipes} onSelect={selectRecipe} />
          <RecipeDetail recipe={recipes[selectedRecipeIndex]} />
        </div>
      )}
    </div>
  );
}

export default App;
