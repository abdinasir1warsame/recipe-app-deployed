import { Link } from 'react-router-dom';
import img from '../assets/images/soup.avif';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  searchIcon,
  filterIcon,
  chevronUp,
  chevronDown,
  favoritesIcon,
  tagsIcon,
  cookbookIcon,
  cuisineIcon,
  difficultyIcon,
  ratingIcon,
  totalTimeIcon,
  shareIcon,
  addRecipeIcon,
  planIcon,
} from '../shared/icons';

export default function NewAllRecipes() {
  const location = useLocation();
  const Navigate = useNavigate();
  const { recipeData, searchParam } = location.state || {};
  const dish = searchParam?.toUpperCase() || '';
  const recipes = recipeData?.results || [];
  const [showMore, setShowMore] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [showFilters, setShowFilters] = useState(false); // Track filter visibility
  const [searchInput, setSearchInput] = useState(''); // Track search input

  // Function to convert Spoonacular Score to a score out of 5
  const convertSpoonacularScoreToFive = (spoonacularScore) => {
    return (spoonacularScore / 100) * 5;
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleSearch = () => {
    console.log('Search executed:', searchInput);
    // Add actual search functionality here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (recipeId !== null) {
      Navigate('./recipe', { state: { recipe: recipeId } });
      console.log(recipeId);
    }
  }, [recipeId]);

  return (
    <div>
      <div className="flex-1 space-y-10 bg-base-200 text-gray-300 px-2 lg:px-28 py-8 ml-0 xl:ml-64 min-h-screen">
        {/* Search Bar */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl">Search Your Recipe</h1>
          </div>

          <div className="flex items-center w-full md:w-auto gap-2 pb-2">
            <input
              type="text"
              placeholder="Search by title, ingredients or content..."
              className="input input-bordered w-full md:w-80"
            />
            <button className="btn btn-ghost btn-square">{searchIcon}</button>
            <button
              className="btn btn-outline btn-sm px-2 flex gap-3"
              onClick={toggleFilters} // Toggle filters on button click
            >
              {filterIcon}
              Filter
              {showFilters ? chevronUp : chevronDown} {/* Dynamic icon */}
            </button>
          </div>

          {/* Filter Buttons */}
          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
              <div className="dropdown group dropdown-hover">
                <label
                  tabIndex={0}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {favoritesIcon} Diet
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 mt-2 menu p-2 bg-base-100 bg-opacity-100 shadow rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Vegetarian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Vegan
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Gluten-Free
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Keto
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Paleo
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Low-Carb
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Lacto-Vegetarian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Ovo-Vegetarian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Primal
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Whole30
                    </label>
                  </li>
                </ul>
              </div>

              <div className="dropdown group dropdown-hover">
                <label
                  tabIndex={1}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {tagsIcon}
                  Intolerance
                </label>
                <ul
                  tabIndex={1}
                  className="dropdown-content z-50 mt-2 menu p-2 bg-base-100 bg-opacity-100 shadow rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Vegetarian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Gluten-Free
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Dairy-Free
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Vegan
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Paleo
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Keto
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Low-Carb
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Nut-Free
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Egg-Free
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      High-Protein
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Low-Sodium
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Whole30
                    </label>
                  </li>
                </ul>
              </div>

              <div className="dropdown group dropdown-hover">
                <label
                  tabIndex={2}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {cookbookIcon} Dish Type
                </label>
                <ul
                  tabIndex={2}
                  className="dropdown-content z-50 mt-2 menu p-2 bg-base-100 bg-opacity-100 shadow rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Main Course
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Side Dish
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Dessert
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Salad
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Appetizer
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Soup
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Breakfast
                    </label>
                  </li>
                </ul>
              </div>

              <div className="dropdown group dropdown-hover">
                <label
                  tabIndex={3}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {cuisineIcon}
                  Cuisine
                </label>
                <ul
                  tabIndex={3}
                  className="dropdown-content z-50 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Italian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Mexican
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Indian
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Chinese
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Japanese
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      French
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Mediterranean
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      American
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Spanish
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Greek
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Thai
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Middle Eastern
                    </label>
                  </li>
                </ul>
              </div>
              <div className="dropdown  group dropdown-hover dropdown-hover">
                <label
                  tabIndex={6}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {totalTimeIcon}
                  Time
                </label>
                <ul
                  tabIndex={6}
                  className="dropdown-content z-50 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Under 15 Minutes
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Under 30 Minutes
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Under 45 Minutes
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />1 Hour
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      1-2 Hours
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      2+ Hours
                    </label>
                  </li>
                </ul>
              </div>
              <div className="dropdown group dropdown-hover">
                <label
                  tabIndex={4}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {difficultyIcon}
                  Difficulty
                </label>
                <ul
                  tabIndex={4}
                  className="dropdown-content z-50 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Easy
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Medium
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Hard
                    </label>
                  </li>
                </ul>
              </div>

              <div className="dropdown group dropdown-hover dropdown-hover">
                <label
                  tabIndex={5}
                  className="btn btn-outline btn-sm flex gap-1"
                >
                  {ratingIcon}
                  Rating
                </label>
                <ul
                  tabIndex={5}
                  className="dropdown-content z-50 mt-2 menu p-2 shadow bg-base-100 rounded-box w-52 group-hover:block hidden"
                >
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />4 Stars & Up
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />3 Stars & Up
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />2 Stars & Up
                    </label>
                  </li>
                  <li>
                    <label className="cursor-pointer">
                      <input type="checkbox" className="mr-2" />1 Star & Up
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 px-8 md:px-4">
          {recipes
            .slice(0, showMore === null ? 10 : 19)
            .map((recipe, index) => (
              <div
                onClick={() => setRecipeId(recipe.id)}
                key={index}
                className="card card-compact bg-base-100 shadow-xl mb-7 hover:opacity-80 cursor-pointer"
              >
                <figure>
                  <img
                    src={recipe.image}
                    alt="Shoes"
                    className="object-cover"
                  />
                </figure>
                <div className="card-body space-y-2">
                  <div className="flex justify-between">
                    <button className="btn btn-xs flex gap-2 hover:text-white hover:opacity-100">
                      {addRecipeIcon}
                      CookBook
                    </button>
                    <button className="btn btn-xs flex gap-2 hover:text-white hover:opacity-100">
                      {shareIcon}
                      Share
                    </button>
                    <button className="btn btn-xs flex gap-2 hover:text-white hover:opacity-100">
                      {planIcon}
                      Plan
                    </button>
                  </div>
                  <div className="hover:text-white hover:opacity-100">
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
      </div>
    </div>
  );
}
