import { useEffect, useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { savedIcon, trashIcon } from '../../../shared/icons';
import { useNavigate } from 'react-router-dom';

export default function FavoriteRecipes({
  recipes,
  setRecipes,
  loading,
  database,
}) {
  const navigate = useNavigate();
  // Function to delete recipe from Firestore
  const handleDeleteRecipe = async (recipeId) => {
    try {
      const recipeDoc = doc(database, 'recipes', recipeId);
      await deleteDoc(recipeDoc);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      console.log('Recipe deleted:', recipeId);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };
  const handleRecipeClick = (recipeId) => {
    navigate('/recipes/recipe', { state: { recipe: recipeId } });
  };
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="card card-compact bg-base-100 shadow-xl mb-7 relative "
          >
            <figure>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="object-cover"
              />
            </figure>
            <div
              onClick={() => handleRecipeClick(recipe.recipeId)}
              className="card-body space-y-2 cursor-pointer hover:opacity-80"
            >
              <div className="hover:text-white ">
                <h2 className="card-title ">{recipe.title}</h2>
                <p
                  className=""
                  dangerouslySetInnerHTML={{
                    __html:
                      recipe.summary.length > 141
                        ? recipe.summary.substring(0, 141) + ' ....'
                        : recipe.summary,
                  }}
                ></p>
              </div>
            </div>
            <div
              className="absolute top-1 right-2 font-bold text-base-200 rounded-xl p-1 backdrop-blur-md bg-white/30 group cursor-pointer"
              onClick={() => handleDeleteRecipe(recipe.id)} // Add delete functionality here
            >
              {/* Show trashIcon on hover (hidden by default) */}
              <span className="group-hover:hidden block">{savedIcon}</span>
              {/* Show trashIcon2 when parent is hovered */}
              <span className="group-hover:block hidden">{trashIcon}</span>
            </div>
          </div>
        ))
      )}
    </>
  );
}
