import { useState, useEffect } from 'react';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import { database } from '../../../assets/googleSignin/config';
import { searchIcon } from '../../../shared/icons';

export default function PlannerButton({ date, user, index, groupedPlanner }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchParam, setSearchParam] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  // Param for API call
  async function fetchRecipeData(query) {
    const apiKey = '74a1a3dced1b4192a47805e76e6bbcae';
    const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch';

    try {
      // Construct the URL with query parameters
      const url = `${baseUrl}?apiKey=${apiKey}&query=${encodeURIComponent(
        query
      )}&number=5`;

      // Make the API request
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      return data.results;
    } catch (error) {
      // Handle any errors
      console.error('Error fetching recipe data:', error);
      throw error;
    }
  }

  const search = async () => {
    if (!searchParam.trim()) return;

    try {
      const query = searchParam.trim();
      console.log('Searching for:', query);

      // Fetch recipe data with the query
      const recipes = await fetchRecipeData(query);

      setSearchedData(recipes);

      setRandomRecipes(getRandomRecipes(recipes));

      setSearchParam(''); // Clear the search parameter after searching
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay.toLocaleDateString('en-US', options)); // Format as "Sunday, Jan 19"
    }
    return days;
  };

  const next7Days = getNext7Days();

  // Fetch suggested recipes from Firestore
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(database, 'suggestedRecipes'),
        (querySnapshot) => {
          const recipes = [];
          querySnapshot.forEach((doc) => {
            recipes.push({ id: doc.id, ...doc.data() });
          });
          setSuggestedRecipes(recipes);
          setRandomRecipes(getRandomRecipes(recipes));
        }
      );
      return () => unsubscribe();
    }
  }, [user]);

  const getRandomRecipes = (recipes) => {
    const shuffled = [...recipes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  };

  const openModal = (recipe) => {
    document.getElementById('my_modal_3').showModal();
    setSelectedRecipe(recipe);
  };

  const addToPlanner = async () => {
    if (!selectedMeal || !user) return;
    document.getElementById('my_modal_3').close();
    setActiveDropdown(null);
    try {
      await addDoc(collection(database, 'planner'), {
        date: selectedDate,
        meal: selectedMeal,
        recipe: selectedRecipe,
        userId: user.uid,
        createdAt: new Date(),
      });

      setSelectedMeal('Choose a category');
    } catch (error) {
      console.error('Error adding to planner:', error);
    }
  };

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Plan Button */}
      <div className="relative px-3">
        <button
          onClick={() => toggleDropdown(index)}
          className="px-4 py-2 text-lg font-semibold btn btn-md rounded-lg transition flex gap-3"
        >
          <span>+</span>
        </button>

        {activeDropdown === index && (
          <div className="absolute right-0 mt-2 w-80 backdrop-blur-md bg-black/40 z-50 border border-gray-300 rounded-lg shadow-lg max-h-[calc(100vh-10rem)] overflow-auto">
            {/* Search Input */}
            <div className="flex items-center p-4 border-b border-gray-200">
              {searchIcon}
              <input
                type="text"
                value={searchParam} // Bind the state value
                onChange={(e) => setSearchParam(e.target.value)} // Update searchParam state
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    search(); // Execute the search function on Enter key
                  }
                }}
                placeholder="Search by title, ingredients or content..."
                className="w-full ml-3 bg-transparent text-gray-400 placeholder-gray-400 focus:outline-none"
              />
            </div>
            {/* Modal */}
            <dialog id="my_modal_3" className="modal backdrop-blur bg-black/20">
              <div className="modal-box backdrop-blur-md bg-black/40 z-2 border border-gray-300 h-[65%] overflow-visible">
                <form method="dialog">
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                </form>
                <h2 className="font-bold text-xl text-white">
                  Organize your Meals
                </h2>
                <h3>Choose a date and category for this recipe</h3>

                <div className="py-3 space-y-2 text-white mt-7 text-xl">
                  <h2>Date</h2>
                  <div className="dropdown w-full">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 backdrop-blur-md bg-black/40 w-full text-white text-lg"
                    >
                      {selectedDate || 'Select a date'}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-200 rounded-box z-[10] w-52 p-2 shadow w-full text-white text-lg"
                    >
                      {next7Days.map((day, i) => (
                        <li key={i}>
                          <a
                            onClick={() => {
                              setSelectedDate(day);
                              document.activeElement?.blur();
                            }}
                          >
                            {day}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="py-3 space-y-2 text-white text-lg">
                  <h2>Meal Type</h2>
                  <div className="dropdown w-full text-white">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn m-1 backdrop-blur-md bg-black/40 w-full text-white text-lg"
                    >
                      {selectedMeal || 'Choose a category'}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[10] w-52 p-2 shadow w-full text-white text-lg"
                    >
                      {meals
                        .filter(
                          (meal) =>
                            !groupedPlanner[selectedDate]?.some(
                              (plan) => plan.meal === meal
                            )
                        )
                        .map((meal, i) => (
                          <li
                            onClick={() => {
                              setSelectedMeal(meal);
                              document.activeElement?.blur();
                            }}
                            key={i}
                          >
                            <a>{meal}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center flex-col items-center">
                  <button
                    onClick={addToPlanner}
                    className="block btn btn-outline text-lg text-white mt-8"
                    disabled={
                      meals.filter(
                        (meal) =>
                          !groupedPlanner[selectedDate]?.some(
                            (plan) => plan.meal === meal
                          )
                      ).length === 0
                    }
                  >
                    Add to Planner
                  </button>
                  {meals.filter(
                    (meal) =>
                      !groupedPlanner[selectedDate]?.some(
                        (plan) => plan.meal === meal
                      )
                  ).length === 0 && (
                    <p className="text-red-500 mt-2 py-2 px-4">
                      This day's meal plan is complete. Remove a meal to make
                      space for a new one.
                    </p>
                  )}
                </div>
              </div>
            </dialog>

            {/* Recipe List */}
            {}
            <ul className="p-4 space-y-3">
              {randomRecipes.length > 0 ? (
                randomRecipes.map((recipe, i) => (
                  <li
                    onClick={() => {
                      openModal(recipe);
                      setSelectedDate(date);
                    }}
                    key={i}
                    className="flex items-center gap-4 p-2 hover:bg-gray-800 cursor-pointer rounded-lg"
                  >
                    {recipe.image ? (
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          className="w-6 h-6 text-gray-500"
                        >
                          <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1Zm0 13a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM7.25 4.5h1.5v4h-1.5v-4Zm.25 5.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z" />
                        </svg>
                      </div>
                    )}
                    <span className="text-lg font-medium text-base-content">
                      {recipe.title}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-gray-500">
                  No recipes found. Try a different search!
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
