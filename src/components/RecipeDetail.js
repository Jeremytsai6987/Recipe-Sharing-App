import React from "react";

function RecipeDetail({ recipe }) {
  if (!recipe) {
    return (
      <section className="recipe-detail">
        <p>Select a recipe to see the details.</p>
      </section>
    );
  }

  return (
    <section className="recipe-detail">
      <h2>{recipe.title}</h2>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.split(",").map((item, idx) => (
          <li key={idx}>{item.trim()}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
    </section>
  );
}

export default RecipeDetail;
