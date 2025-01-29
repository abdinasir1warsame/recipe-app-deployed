import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../../googleSignin/config'; // Adjust the path as needed
import { userAuth } from '../../../context/AuthContext';

export default function PopularRecipes() {
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const { user } = userAuth();
  const navigate = useNavigate();
  const RECIPES_TO_DISPLAY = 10; // Number of recipes to show

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(database, 'suggestedRecipes'),
        (querySnapshot) => {
          const recipes = [];
          querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
          });

          // Remove duplicates and shuffle recipes
          const uniqueRecipes = removeDuplicates(recipes);
          const shuffledRecipes = shuffleRecipes(uniqueRecipes);
          setDisplayedRecipes(shuffledRecipes.slice(0, RECIPES_TO_DISPLAY));
        },
        (error) => {
          console.error('Error fetching recipes from Firestore:', error);
        }
      );

      return () => unsubscribe();
    }
  }, [user]);

  // Helper function to shuffle recipes
  const shuffleRecipes = (recipes) => {
    const shuffled = [...recipes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Helper function to remove duplicates based on recipe ID
  const removeDuplicates = (recipes) => {
    const unique = new Map();
    recipes.forEach((recipe) => {
      unique.set(recipe.id, recipe);
    });
    return Array.from(unique.values());
  };

  const handleRecipeClick = (recipeId) => {
    navigate('/recipes/recipe', { state: { recipe: recipeId } });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Most Popular Recipes</h1>
      <div className="grid grid-cols-3 sm-grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-8 ">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="shadow-md space-y-1 cursor-pointer"
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="rounded-2xl h-24 md:h-32 hover:opacity-75"
            />
            <p className="text-lg md:text-xl">{recipe.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
