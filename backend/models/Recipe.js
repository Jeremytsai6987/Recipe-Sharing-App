// File: backend/models/Recipe.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  ingredients: String,
  instructions: String,
  isPublic: { type: Boolean, default: false }, // Indicates if the recipe is public
});

module.exports = mongoose.model("Recipe", RecipeSchema);
