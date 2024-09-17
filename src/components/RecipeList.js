import React from "react";

function RecipeList({ recipes, onSelect }) {
  return (
    <section className="recipe-list">
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index} onClick={() => onSelect(index)}>
            {recipe.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecipeList;
