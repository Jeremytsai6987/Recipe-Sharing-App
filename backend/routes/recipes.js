// File: backend/routes/recipes.js

const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

// Public route to get all public recipes
// @route   GET /api/recipes/public
// @desc    Get all public recipes
// @access  Public
router.get("/public", async (req, res) => {
  try {
    const recipes = await Recipe.find({ isPublic: true });
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching public recipes:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Apply 'auth' middleware to all routes below
// All routes defined after this line will require authentication
router.use(auth);

// Private route to get all recipes for the authenticated user
// @route   GET /api/recipes
// @desc    Get all recipes for a user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (err) {
    console.error("Error fetching user recipes:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Private route to add a new recipe
// @route   POST /api/recipes
// @desc    Add a new recipe
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { title, ingredients, instructions, isPublic } = req.body;

    const newRecipe = new Recipe({
      user: req.user.id,
      title,
      ingredients,
      instructions,
      isPublic: isPublic || false,
    });

    const recipe = await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    console.error("Error adding recipe:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Additional private routes (e.g., update, delete) can be added here.

module.exports = router;
