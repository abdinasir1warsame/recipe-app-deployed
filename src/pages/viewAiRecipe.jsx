import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path if necessary
import { userAuth } from '../context/AuthContext';
import TopSection from '../assets/components/generatePage.jsx/topSection';

export default function ViewAiRecipe() {
  const [recipe, setRecipe] = useState(null);
  const { user } = userAuth();
  const location = useLocation();
  const { recipeId } = location.state || {}; // Get the recipeId passed via state

  useEffect(() => {
    const fetchRecipeById = async () => {
      if (!user || !recipeId) return; // Exit if no user or recipeId

      try {
        const recipeRef = doc(database, 'aiGenerated', recipeId); // Reference the document by id
        const docSnapshot = await getDoc(recipeRef);

        if (docSnapshot.exists()) {
          setRecipe({ id: docSnapshot.id, ...docSnapshot.data() }); // Store the recipe in state
        } else {
          console.log('No such recipe found!');
        }
      } catch (error) {
        console.error('Error fetching recipe by ID:', error);
      }
    };

    fetchRecipeById();
  }, [user, recipeId]);

  if (!recipe) {
    return <p>Loading recipe...</p>; // Show a loading message until the recipe is fetched
  }

  return (
    <>
      <div className="flex-1 bg-base-200 text-gray-300  px-2  lg:px-32 ml-0 lg:ml-64">
        <TopSection recipe={recipe} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 lg:p-8">
          {/* Recipe Image */}
          <div className="lg:col-span-1">
            <img
              src={recipe.imageUrl}
              alt={recipe.dish_name}
              className="rounded-lg shadow-md w-full max-h-[350px]"
            />
          </div>
          {/* Recipe Details */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-4xl font-bold">{recipe.dish_name}</h1>
              <div className="flex gap-2">
                <button className="btn btn-sm background">Share</button>
                <button className="btn btn-sm background">Plan</button>
              </div>
            </div>
            <div className="text-lg py-2 pb-6">
              <p>{recipe.description}</p>
            </div>
            <div className="flex items-center gap-4 mb-4 text-lg">
              <div className="flex items-center">
                <span className="text-yellow-500">★★★★★</span>
                <span className="ml-2">0 Ratings</span>
              </div>
              <div className="text-lg">
                <strong>Author:</strong> Taron Timothée
              </div>
            </div>

            <div className="flex items-center gap-4  mb-4">
              <span className="badge badge-outline text-md px-3 py-4 flex gap-2">
                Prep: 4 mins
              </span>
              <span className="badge badge-outline text-md px-3 py-4 flex gap-2">
                Cook: 10 mins
              </span>
              <span className="badge badge-outline text-md px-3 py-4 flex gap-2">
                Nutrients
              </span>
            </div>
          </div>

          {/* Ingredients & Steps */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            {/* Ingredients */}
            <div className="card shadow-md p-4 text-xl">
              <h2 className="text-2xl font-bold mb-4">Ingredients</h2>

              {Object.keys(recipe.ingredient_breakdown || {}).map(
                (category) => (
                  <div key={category}>
                    <h3 className="text-xl font-semibold py-3 pb-4">
                      {category
                        .replace(/_/g, ' ')
                        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
                      :
                    </h3>
                    <ul className="list-disc list-inside flex flex-col gap-4">
                      {recipe.ingredient_breakdown[category].map(
                        (ingredient, index) => (
                          <li className="flex items-center gap-4" key={index}>
                            <div className="flex gap-4 items-center">
                              <input
                                type="checkbox"
                                defaultChecked
                                className="checkbox checkbox-primary"
                              />
                              {ingredient}
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )
              )}

              {recipe.pricing_information?.total_cost && (
                <div className="py-7 text-2xl font-semibold">
                  Estimated Total Cost: £
                  {Number(recipe.pricing_information.total_cost).toFixed(2)}
                </div>
              )}
            </div>

            {/* Steps */}
            <div className="card shadow-md p-4 text-xl">
              <h2 className="text-2xl font-bold mb-4">Cooking Steps</h2>

              {recipe.cooking_instructions?.main_dish?.map((step, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold text-2xl mb-4">
                    Step {index + 1}
                  </h3>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
