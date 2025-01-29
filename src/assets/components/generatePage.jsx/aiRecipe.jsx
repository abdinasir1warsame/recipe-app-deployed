export default function AiRecipe({ recipe, imageUrl }) {
  return (
    <>
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
                          <li className="flex  items-center gap-4" key={index}>
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
                <h3 className="text-xl font-semibold mt-6">Accompaniments:</h3>
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
    </>
  );
}
