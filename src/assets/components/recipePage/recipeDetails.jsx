import React, { useEffect, useState } from 'react';
import AddToPlanner from './addToPlan';
const RecipeDetails = ({ recipeData, setSuccessMessage, successMessage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    console.log(recipeData);
  }, [recipeData]);
  return (
    <>
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
            <button className="btn btn-sm shadow background cursor-pointer">
              Share
            </button>
            {/* <button className="btn btn-sm shadow background cursor-pointer">
              Plan
            </button> */}
            <AddToPlanner
              recipeData={recipeData}
              className=" btn btn-sm shadow background cursor-pointer"
              text="Plan"
            />
          </div>
        </div>
        <div className="text-lg py-2 pb-6">
          <p>
            {recipeData.summary && recipeData.summary.length > 303 ? (
              <>
                {isExpanded ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: recipeData.summary,
                    }}
                  />
                ) : (
                  <>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: recipeData.summary.substring(0, 303),
                      }}
                    />
                    <span className="text-gray-500"> ... </span>
                  </>
                )}
                <button
                  className="btn btn-outline btn-sm ml-2 text-lg m-3 hover:text-white hover:opacity-80"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? 'Show Less' : 'Read More'}
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
            <strong>Author:</strong>{' '}
            <a href={recipeData.sourceUrl}>{recipeData.sourceName}</a>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4"></div>
      </div>
    </>
  );
};

export default RecipeDetails;
