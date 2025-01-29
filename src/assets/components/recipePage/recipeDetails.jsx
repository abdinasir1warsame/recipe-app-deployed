import React from 'react';

const RecipeDetails = ({ recipeData, setSuccessMessage, successMessage }) => (
  <>
    {' '}
    {/* Recipe Image */}
    <div className="lg:col-span-1">
      <img
        src={recipeData.image}
        alt="Recipe Image"
        className="rounded-lg shadow-md w-full"
      />
    </div>
    {/* Recipe Details */}
    <div className="lg:col-span-2 flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-bold">{recipeData.title}</h1>
        <div className="flex gap-2">
          <button className="btn btn-sm btn-warning">Share</button>
          <button className="btn btn-sm btn-warning">Plan</button>
        </div>
      </div>
      <div className="text-lg py-2 pb-6">
        <p>
          {recipeData.summary && recipeData.summary.length > 303 ? (
            <>
              <span
                dangerouslySetInnerHTML={{
                  __html: recipeData.summary.substring(0, 303),
                }}
              />
              <span className="text-gray-500"> ... </span>
              <button
                className="btn btn-outline btn-sm ml-2 text-lg m-3 hover:text-white hover:opacity-80"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                Read More
              </button>
            </>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: recipeData.summary }} />
          )}
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
  </>
);

export default RecipeDetails;
