import { useState, useEffect } from 'react';
import { Sparkles } from '../shared/icons';
export default function AiPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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
          setRecipe(recipeData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setRecipe(null);
        }
      } else {
        setRecipe(null);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  // const fetchImage = async () => {
  //   if (!searchQuery) return;
  //   setLoading(true);
  //   const apiKey = 'AIzaSyDq-33oatddrGD_CooK8cbbvjf3HPuh9Oo';
  //   const cx = '271f2772958b441bb';

  //   try {
  //     const response = await fetch(
  //       `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${searchQuery}&searchType=image&num=1&imgSize=medium`
  //     );
  //     const data = await response.json();
  //     if (data.items && data.items.length > 0) {
  //       setImageUrl(data.items[0].link);
  //     } else {
  //       setImageUrl('');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching image:', error);
  //     setImageUrl('');
  //   }
  // };
  const fetchImage = async () => {
    if (!searchQuery) return;
    setLoading(true);
    console.log('Making image generation request...');

    try {
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt: searchQuery, // Use the search query as the image prompt
            n: 1, // Number of images to generate
            size: '1024x1024', // Image size
          }),
        }
      );

      const data = await response.json();
      console.log('API Response:', data);

      if (data.data && data.data.length > 0) {
        setImageUrl(data.data[0].url); // Set the generated image URL
      } else {
        setImageUrl('');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setImageUrl('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-16 bg-base-200 text-gray-300 px-2 lg:px-28 py-8 ml-0 lg:ml-64 min-h-screen">
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
      {recipe && (
        <div>
          {/* top section */}
          <div className="  px-2 lg:px-8 py-2 flex justify-between">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
              CookBook
            </button>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
              Share
            </button>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              Plane
            </button>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-2 lg:p-8">
            {/* Recipe Image */}
            <div className="lg:col-span-1">
              <img
                src={imageUrl}
                alt="Recipe Image"
                className="rounded-lg shadow-md w-full max-h-[350px] "
              />
            </div>
            {/* Recipe Details */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-4xl font-bold">{recipe.dish_name}</h1>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-warning">Share</button>
                  <button className="btn btn-sm btn-warning">Plan</button>
                </div>
              </div>
              <div className="text-lg py-2 pb-6">
                <p>
                  {recipe.description} {recipe.cultural_context.background}
                </p>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Prep: 4 mins
                </span>
                <span className="badge badge-outline text-md px-3 py-4 flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  Cook: 10 mins
                </span>
                <span className="badge badge-outline text-md px-3 py-4 flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12h3l3 8 4-16 3 8h4"
                    />
                  </svg>
                  Nutrients
                </span>
              </div>
            </div>
            {/* Ingredients & Steps */}

            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
              {/* Ingredients */}
              <div className="card shadow-md p-4 text-xl">
                <h2 className="text-2xl font-bold mb-4">Ingredients</h2>

                {/* Serving Adjustment */}
                <div className="font-semibold text-2xl mb-4 gap-5 flex items-center">
                  <span>4 servings</span>
                  <button className="btn btn-xs text-xl text-center btn-outline">
                    -
                  </button>
                  <button className="btn btn-xs text-xl btn-outline">+</button>
                </div>

                {/* Display Ingredient Categories */}
                {Object.keys(recipe.ingredient_breakdown).map((category) => {
                  const ingredients = recipe.ingredient_breakdown[category];
                  return (
                    ingredients?.length > 0 && (
                      <div key={category}>
                        <h3 className="text-xl font-semibold py-3 pb-4">
                          {category
                            .replace(/_/g, ' ')
                            .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())}
                          :
                        </h3>
                        <ul className="list-disc list-inside flex flex-col gap-4">
                          {ingredients.map((ingredient, index) => {
                            // Normalize the ingredient name for pricing lookup
                            const normalizedIngredient = ingredient
                              .replace(/^\d+\s|\s\(.+?\)/g, '') // Remove quantities and parentheticals
                              .toLowerCase()
                              .trim();

                            return (
                              <li
                                className="flex  items-center gap-4"
                                key={index}
                              >
                                <div className="flex gap-4 items-center">
                                  <input
                                    type="checkbox"
                                    defaultChecked
                                    className="checkbox checkbox-primary"
                                  />
                                  {ingredient}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )
                  );
                })}

                {/* Total Cost */}
                {recipe.pricing_information?.total_cost && (
                  <div className="py-7 text-2xl font-semibold ">
                    Estimated Total Cost: £
                    {Number(recipe.pricing_information.total_cost).toFixed(2)}
                  </div>
                )}
              </div>

              {/* Steps */}
              <div className="card shadow-md p-4 text-xl">
                <h2 className="text-2xl font-bold mb-4">Cooking Steps</h2>

                {/* Main Dish Steps */}
                {recipe.cooking_instructions.main_dish?.length > 0 &&
                  recipe.cooking_instructions.main_dish.map((step, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-2xl mb-4">
                        Step {index + 1}
                      </h3>
                      <p>{step}</p>
                    </div>
                  ))}

                {/* Accompaniments */}
                {recipe.cooking_instructions.accompaniments?.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mt-6">
                      Accompaniments:
                    </h3>
                    {recipe.cooking_instructions.accompaniments.map(
                      (step, index) => (
                        <div key={index} className="mb-4">
                          <h3 className="font-semibold text-2xl mb-4">
                            Step {index + 1}
                          </h3>
                          <p>{step}</p>
                        </div>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
