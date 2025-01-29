import { Link } from 'react-router-dom';
import img from '../assets/images/soup.avif';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addRecipeIcon, shareIcon, planIcon } from '../shared/icons';
import AddToPlann from '../assets/components/allRecipes/addToPlanner';
import AddToFavorite from '../assets/components/allRecipes/addToFavorites';

export default function NewAllRecipes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipeData, searchParam } = location.state || {};
  const [successMessage2, setSuccessMessage2] = useState('');
  const dish = searchParam?.toUpperCase() || '';
  const recipes = recipeData?.results || [];
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    if (recipeId !== null) {
      navigate('./recipe', { state: { recipe: recipeId } });
    }
  }, [recipeId]);

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex-1 space-y-10 bg-base-200 text-gray-300 px-2 lg:px-28 lg:py-8 ml-0 xl:ml-64 min-h-screen py-20">
        {/* Page Header */}
        <div className="space-y-6 ">
          <div className="px-8">
            <h1 className="text-4xl">Search Your Recipe</h1>
            <p className="text-lg">
              Found {recipes.length} recipes for "{dish}"
            </p>
          </div>
        </div>

        {/* Recipe Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 px-8 md:px-4">
          {currentRecipes.map((recipe, index) => (
            <div className="card card-compact bg-base-100 shadow-xl mb-7 hover:opacity-80 cursor-pointer">
              <figure>
                <img src={recipe.image} alt="Recipe" className="object-cover" />
              </figure>
              {successMessage2 && (
                <div
                  role="alert"
                  className=" w-80 alert alert-success backdrop-blur bg-black/40 text-white z-50 flex justify-center mb-5 mt-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{successMessage2}</span>
                </div>
              )}
              <div className="card-body space-y-2">
                <div className="flex justify-between">
                  <AddToFavorite
                    recipe={recipe}
                    setSuccessMessage2={setSuccessMessage2}
                  />
                  <button className="btn btn-xs flex gap-2 hover:text-white hover:opacity-100">
                    {shareIcon}
                    Share
                  </button>
                  <AddToPlann recipe={recipe} />
                </div>
                <div
                  onClick={() => setRecipeId(recipe.id)}
                  key={index}
                  className="hover:text-white hover:opacity-100"
                >
                  <h2 className="card-title">{recipe.title}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        recipe.summary.length > 141
                          ? recipe.summary.substring(0, 141) + ' ....'
                          : recipe.summary,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="join">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`join-item btn ${
                    currentPage === index + 1
                      ? 'btn btn-outline border border-primary bg-gray-400 text-black'
                      : 'btn-outline'
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
