// File: src/components/AddRecipeForm.js

import React, { useState } from "react";

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, ingredients, instructions, isPublic });
    setTitle("");
    setIngredients("");
    setInstructions("");
    setIsPublic(false);
  };

  return (
    <section className="add-recipe-form">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingredients (separated by commas):</label>
          <br />
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Instructions:</label>
          <br />
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            Make this recipe public
          </label>
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </section>
  );
}

export default AddRecipeForm;
