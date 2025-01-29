import { useState, useEffect, useRef } from 'react';
import { doc, setDoc, collection } from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';
import { Sparkles } from '../shared/icons';
import TopSection from '../assets/components/generatePage.jsx/topSection';
import AiRecipe from '../assets/components/generatePage.jsx/aiRecipe';

export default function AiPage() {
  const { user } = userAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchRecipe = async () => {
    if (!searchQuery) return;
    setIsSearchActive(true);

    const prompt = `
      Always provide a recipe in the following structured JSON format, even for short or ambiguous queries. 
      Never ask follow-up questions or request clarifications. If a query is vague, make reasonable assumptions and return a recipe:
      {
        "dish_name": "Dish name",
        "description": "A brief description of the dish",
        "ingredient_breakdown": {
          "main_ingredients": ["List of main ingredients"],
          "aromatics_and_seasonings": ["List of seasonings"],
          "sauce_components": ["List of sauce ingredients"],
          "servings_finishes": ["Serving garnishes"]
        },
        "pricing_information": {
          "total_cost": total_cost_in_gbp
        },
        "cooking_instructions": {
          "main_dish": ["Step-by-step instructions for the main dish"],
          "accompaniments": ["Instructions for any side dishes or accompaniments"]
        },
        "cultural_context": {
          "background": "A brief history or cultural context for the dish"
        },
        "export_options": {
          "share_recipe": true,
          "generate_shopping_list": true
        }
      }
    `;

    try {
      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4',
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful recipe assistant. Always respond with a recipe in JSON format. Never ask questions or seek clarifications.',
              },
              { role: 'user', content: prompt },
              { role: 'user', content: searchQuery },
            ],
            max_tokens: 800,
          }),
        }
      );

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        try {
          const recipeData = JSON.parse(data.choices[0].message.content);
          setRecipeData(recipeData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setRecipeData(null);
        }
      } else {
        setRecipeData(null);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipeData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async () => {
    if (!searchQuery) return;
    setLoading(true);

    const cx = '271f2772958b441bb';

    try {
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&searchType=image&num=1&imgSize=medium`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        // Get the original image URL
        const imageUrl = data.items[0].link;

        // Resize the image using Cloudinary by appending query parameters to the URL
        const resizedImageUrl = `https://res.cloudinary.com/dbvc8kvso/image/fetch/w_556,h_370,c_fill/${imageUrl}`;

        // Set the resized image URL in the state
        setImageUrl(resizedImageUrl);
      } else {
        setImageUrl('');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      setImageUrl('');
    }
  };

  const saveRecipeToDatabase = async () => {
    if (recipeData && imageUrl && user) {
      try {
        const recipeCollection = collection(database, 'aiGenerated');

        // Use a unique ID for the document
        const recipeId = doc(recipeCollection).id;

        // Create the recipe object
        const newRecipe = {
          id: recipeId,
          ...recipeData,
          imageUrl,
          generatedBy: user.uid,
          createdAt: new Date().toISOString(),
        };

        // Save to Firestore
        await setDoc(doc(recipeCollection, recipeId), newRecipe);
        console.log('Recipe saved successfully with ID:', recipeId);

        // Update the recipe state with the newly saved recipe
        setRecipe(newRecipe); // Assuming `setRecipe` is the function that updates the `recipe` state
      } catch (error) {
        console.error('Error saving recipe to database:', error);
      }
    }
  };

  // Ref to track whether saving is in progress
  const isSaving = useRef(false);

  useEffect(() => {
    const saveIfReady = async () => {
      if (recipeData && imageUrl && !isSaving.current) {
        isSaving.current = true;
        await saveRecipeToDatabase();
        isSaving.current = false;
      }
    };

    saveIfReady();
  }, [recipeData, imageUrl]);

  return (
    <div className="flex-1 space-y-16 bg-base-200 text-gray-300 lg:px-2 px-8 lg:px-10 xl:px-14 2xl:px-28 py-20 lg:py-10 md-py-8 ml-0 lg:ml-64 min-h-screen  lg:mt-0 lg:mb-0">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50  ml-0 lg:ml-64">
          <div className="text-center">
            <div className="loading loading-spinner loading-lg mb-4 w-[100px] h-[100px]"></div>
            <p className="text-white text-4xl">
              Generating your recipe, please wait...
            </p>
          </div>
        </div>
      )}
      {!isSearchActive && (
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl">Describe your desired recipe</h1>
          </div>

          <div className="flex items-center w-full md:w-auto gap-2 pb-2">
            <input
              type="text"
              placeholder="e.g., Spicy vegan pasta with creamy..."
              className="input input-bordered w-full md:w-80"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
      {!isSearchActive && (
        <div className="hero">
          <div className="hero-content text-center">
            <div className="space-y-2 max-w-md">
              <button className="btn btn-2xl h-20 w-20 btn-outline border-primary">
                {Sparkles}
              </button>
              <h1 className="text-xl font-bold">AI Powered Recipe Generator</h1>
              <p className="text-lg pb-2">
                Let Recipe AI Generate A Suitable Recipe For You.
              </p>
              <button
                className="btn btn-primary shadow-md text-gray-300 text-lg px-5"
                onClick={() => {
                  fetchImage();
                  fetchRecipe();
                }}
                disabled={loading}
              >
                {loading ? 'Generating...' : 'Generate Recipe With AI'}
              </button>
              <h1 className="text-lg pt-2">Discover Recipes</h1>
            </div>
          </div>
        </div>
      )}
      {/* Display Recipe */}
      {recipeData && (
        <div>
          <TopSection recipe={recipe} imageUrl={imageUrl} />
          <AiRecipe recipe={recipeData} imageUrl={imageUrl} />
        </div>
      )}
    </div>
  );
}
