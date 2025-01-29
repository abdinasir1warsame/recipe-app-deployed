import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';

import FavoriteRecipes from '../assets/components/cookBook/favourites';
import AiRecipes from '../assets/components/cookBook/aiGenerated';

export default function CookBook() {
  const { user } = userAuth();
  const [recipes, setRecipes] = useState([]); // For favourite recipes
  const [aiRecipes, setAiRecipes] = useState([]); // For AI-generated recipes
  const [loading, setLoading] = useState(true);
  const [showAiRecipes, setShowAiRecipes] = useState(false); // To toggle between AI recipes and favourites

  // Fetch favourite recipes when the user is logged in
  useEffect(() => {
    const fetchFavouriteRecipes = async () => {
      if (!user) return; // Exit if user is not logged in

      try {
        const q = query(
          collection(database, 'recipes'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        const recipesArray = [];
        querySnapshot.forEach((doc) => {
          recipesArray.push({ id: doc.id, ...doc.data() });
        });

        setRecipes(recipesArray); // Set favourite recipes to state
      } catch (error) {
        console.error('Error fetching favourite recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavouriteRecipes();
  }, [user]);

  // Fetch AI-generated recipes when toggling to AI recipes
  useEffect(() => {
    const fetchAiGeneratedRecipes = async () => {
      if (!user) return; // Exit if no user or not toggling to AI-generated

      try {
        const q = query(
          collection(database, 'aiGenerated'),
          where('generatedBy', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        const aiRecipesArray = [];
        querySnapshot.forEach((doc) => {
          aiRecipesArray.push({ id: doc.id, ...doc.data() });
        });

        setAiRecipes(aiRecipesArray); // Set AI-generated recipes to state
      } catch (error) {
        console.error('Error fetching AI-generated recipes:', error);
      }
    };

    fetchAiGeneratedRecipes();
  }, [user]); // Re-fetch AI recipes whenever user or showAiRecipes changes

  // Handle showing AI-generated recipes
  const handleShowAiRecipes = () => {
    setShowAiRecipes(true); // Show AI-generated recipes
  };

  // Handle showing favourite recipes
  const handleShowFavourites = () => {
    setShowAiRecipes(false); // Show favourite recipes
  };

  return (
    <div className="flex-1 space-y-10 bg-base-200 text-gray-300  px-2 lg:px-28 py-16 lg:py-8  ml-0 lg:ml-64 min-h-screen">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-5 lg:gap-0">
        <p className="text-4xl px-6">Cook Book</p>
        <div className=" w-full lg:w-auto flex px-6 gap-4 pb-4 ">
          <button
            className={
              !showAiRecipes
                ? 'btn btn-outline text-xl shadow shadow-black'
                : 'text-xl shadow-xl rounded-lg px-5'
            }
            onClick={handleShowFavourites}
          >
            Favourites
          </button>
          <button
            className={
              showAiRecipes
                ? 'btn btn-outline text-xl shadow shadow-black'
                : 'text-xl shadow-xl rounded-lg px-5'
            }
            onClick={handleShowAiRecipes}
          >
            AI Generated Recipes
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 px-8 md:px-4">
        {/* Conditionally render based on the button selection */}
        {showAiRecipes ? (
          <AiRecipes aiRecipes={aiRecipes} />
        ) : (
          <FavoriteRecipes
            recipes={recipes}
            setRecipes={setRecipes}
            loading={loading}
            database={database}
          />
        )}
      </div>
    </div>
  );
}
