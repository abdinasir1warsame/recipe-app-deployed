import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';
import Fraction from 'fraction.js';
import TopSection from '../assets/components/recipePage/topSection';
import RecipeDetails from '../assets/components/recipePage/recipeDetails';
import Ingredients from '../assets/components/recipePage/ingredients';
import CookingSteps from '../assets/components/recipePage/cookingSteps';

export default function NewRecipePage() {
  const { user } = userAuth();
  const location = useLocation();
  const { recipe } = location.state || {};
  const [recipeData, setRecipeData] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentServings, setCurrentServings] = useState(1);

  useEffect(() => {
    console.log('useEffect triggered');
    const apiKey3 = '74a1a3dced1b4192a47805e76e6bbcae';
    const url = `https://api.spoonacular.com/recipes/${recipe}/information?apiKey=${apiKey3}&includeNutrition=true`;

    async function fetchRecipeData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response not ok');
        }
        const data = await response.json();
        setRecipeData(data);
        setCurrentServings(data.servings); // Initialize servings from API
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (recipe) {
      fetchRecipeData();
      console.log(recipe);
    } else {
      console.log('recipeId is invalid');
    }
  }, [recipe]);

  const method = recipeData?.analyzedInstructions?.[0]?.steps || [];
  const ingredients = recipeData?.extendedIngredients || [];
  console.log(ingredients);

  const handleIngredientCheck = (ingredient) => {
    setSelectedIngredients((prevSelected) => {
      if (prevSelected.includes(ingredient)) {
        return prevSelected.filter((item) => item !== ingredient); // Remove ingredient if already selected
      } else {
        return [...prevSelected, ingredient]; // Add ingredient if not selected
      }
    });
  };

  const changeServings = (increment) => {
    setCurrentServings((prev) => {
      const newServings = prev + increment;
      if (newServings >= 1 && newServings <= 10) {
        return newServings;
      }
      return prev;
    });
  };

  return (
    <div className="flex">
      {/* Main Content */}

      <div className="flex-1 bg-base-200 text-gray-300  px-2  lg:px-32 ml-0 lg:ml-64">
        <TopSection
          user={user}
          recipe={recipe}
          recipeData={recipeData}
          database={database}
        />

        {/* middle section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 lg:p-8">
          <RecipeDetails
            recipeData={recipeData}
            setSuccessMessage={setSuccessMessage}
            successMessage={successMessage}
          />

          {/* Ingredients & Steps */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            <Ingredients
              ingredients={recipeData?.extendedIngredients || []}
              currentServings={currentServings}
              setCurrentServings={setCurrentServings}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
              handleIngredientCheck={handleIngredientCheck} // Pass the function here
              user={user}
              database={database}
              changeServings={changeServings} // Pass this down
            />

            {/* Steps */}
            <CookingSteps
              method={recipeData?.analyzedInstructions?.[0]?.steps || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
