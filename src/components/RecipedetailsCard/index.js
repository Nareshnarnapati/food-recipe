import React from 'react';
import "./index.css";

const RecipeDetails = ({ selectedRecipe, onClose, position }) => {
  const { label, image, ingredients, instructions } = selectedRecipe;

  const style = {
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div className="recipe-details" style={style}>
      {image && <img src={image} alt={label} className="image-card"/>}
      {label && <h1 className="recipe-card-h1">{label}</h1>}
      {ingredients && (
        <div >
          <h2 className="ingredient-card">Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.text} - {ingredient.quantity} {ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
      )}
      {instructions && (
        <div className="instructions">
          <h2>Instructions</h2>
          <ol>
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      )}
      <button className="button-card" onClick={onClose}>Close</button>
    </div>
  );
};

export default RecipeDetails;
