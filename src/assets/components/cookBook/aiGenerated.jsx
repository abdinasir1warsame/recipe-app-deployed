import { useEffect } from 'react';
import { Sparkles } from '../../../shared/icons';
import { useNavigate } from 'react-router-dom';

export default function AiRecipes({ aiRecipes }) {
  const navigate = useNavigate();
  const handleRecipeClick = (recipeId) => {
    navigate('/ai-recipe', { state: { recipeId: recipeId } });
  };
  // Render AI recipes or a message if there are no recipes
  return (
    <>
      {Array.isArray(aiRecipes) && aiRecipes.length > 0 ? (
        aiRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card card-compact bg-base-100 shadow-xl mb-7 relative "
          >
            <figure>
              <img
                src={recipe.imageUrl}
                alt={recipe.title || 'Recipe Image'}
                className=" "
              />
            </figure>
            <div
              onClick={() => handleRecipeClick(recipe.id)}
              className="card-body space-y-2 cursor-pointer hover:opacity-80"
            >
              <div className="hover:text-white">
                <h2 className="card-title">
                  {recipe.dish_name || 'Untitled Dish'}
                </h2>
                <p>{recipe.description}</p>
              </div>
            </div>
            <div className="absolute top-1 right-2 font-bold text-base-200 rounded-xl p-1 backdrop-blur-md bg-black/40 group cursor-pointer">
              {/* Show trashIcon on hover (hidden by default) */}
              <span className=" border-primary">{Sparkles}</span>
            </div>
          </div>
        ))
      ) : (
        <div>No AI-generated recipes available.</div> // Message when no recipes are found
      )}
    </>
  );
}
