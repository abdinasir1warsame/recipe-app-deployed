import { useEffect, useState } from 'react';
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path to your config file
import { userAuth } from '../context/AuthContext';
import { showMoreIcon2, searchIcon } from '../shared/icons';
import { useNavigate } from 'react-router-dom';
import PlannerButton from '../assets/components/mealPlannerPage/mealPlannerPage';
export default function MealPlanner() {
  const [next7Days, setNext7Days] = useState([]);

  const [planner, setPlanner] = useState([]);
  const [groupedPlanner, setGroupedPlanner] = useState({});

  const navigate = useNavigate();
  const { user } = userAuth();

  // Generate the next 7 days
  const getNext7Days = () => {
    const days = [];
    const options = { weekday: 'long', month: 'short', day: 'numeric' };

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.toLocaleDateString('en-US', options));
    }

    return days;
  };

  // Initialize and update next 7 days
  useEffect(() => {
    setNext7Days(getNext7Days());
  }, []);

  // Fetch suggested recipes and planner data from Firestore
  useEffect(() => {
    if (user) {
      const unsubscribePlanner = onSnapshot(
        collection(database, 'planner'),
        (querySnapshot) => {
          const plannerList = [];
          querySnapshot.forEach((doc) => {
            plannerList.push({ id: doc.id, ...doc.data() });
          });

          setPlanner(plannerList);
        }
      );

      return () => {
        unsubscribePlanner();
      };
    }
  }, [user]);

  // Group planner items by date whenever planner changes
  useEffect(() => {
    const groupByDate = () => {
      const days = getNext7Days();
      const grouped = {};

      // Initialize grouped object with the next 7 days
      days.forEach((day) => {
        grouped[day] = [];
      });

      // Populate grouped object with planner data
      planner.forEach((plan) => {
        if (!grouped[plan.date]) {
          grouped[plan.date] = [];
        }
        grouped[plan.date].push(plan);
      });

      return grouped;
    };

    setGroupedPlanner(groupByDate());
  }, [planner, next7Days]);

  const meals = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];

  const handleMealClick = (recipeId) => {
    console.log('Recipe clicked:', recipeId); // Add this to debug
    navigate('/recipes/recipe', { state: { recipe: recipeId } });
  };

  const handleDeleteMeal = async (plannerId) => {
    try {
      // Reference the Firestore document
      const plannerDoc = doc(database, 'planner', plannerId);

      // Delete the document from Firestore
      await deleteDoc(plannerDoc);

      // Update the local state to remove the deleted plan
      setPlanner((prevPlanner) =>
        prevPlanner.filter((plan) => plan.id !== plannerId)
      );

      console.log('Meal deleted:', plannerId);
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };
  return (
    <div className="flex-1 space-y-5 bg-base-200 text-base-content px-2 lg:px-10 xl:px-14 2xl:px-28 py-7 md-py-8 ml-0 lg:ml-64 min-h-screen mb-14 mt-9 lg:mt-0 lg:mb-0">
      <div className="pb-3">
        <p className="text-2xl text-gray-600"></p>
        <h1 className="text-4xl font-bold text-white">Meal planner</h1>
      </div>
      <div className="space-y-4">
        {Object.keys(groupedPlanner).map((date, index) => (
          <div
            key={index}
            className="flex bg-base-100 justify-between items-center border-[1px] border-gray-500 shadow shadow-lg rounded-lg p-4"
          >
            {/* Day and Date */}
            <div>
              <div className="flex gap-4 ">
                <span className="block text-2xl font-bold">{date}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mb-5">
                {groupedPlanner[date]?.length > 0 ? (
                  groupedPlanner[date]
                    .sort(
                      (a, b) => meals.indexOf(a.meal) - meals.indexOf(b.meal)
                    ) // Sort meals chronologically
                    .map((plan, idx) => (
                      <div key={idx} className="meal-item ">
                        <div className="flex justify-between items-center ">
                          <h2 className="text-xl py-2 mt-1">{plan.meal}</h2>
                          <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button" className="m-1">
                              {showMoreIcon2}
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content gap-1 menu backdrop-blur-md bg-black/40 z-50 border border-gray-300 rounded-lg shadow-lg p-2 hover:bg-red-700 hover:text-white"
                            >
                              <li onClick={() => handleDeleteMeal(plan.id)}>
                                <a>Delete</a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div
                          onClick={() => handleMealClick(plan.recipe.id)}
                          className="flex items-center gap-2 shadow-md pt-2  rounded-xl hover:cursor-pointer transform hover:scale-105 transition duration-300"
                        >
                          <img
                            src={plan.recipe?.image || 'placeholder-image-url'} // Fallback if image is undefined
                            alt={plan.recipe?.title || 'Recipe Image'}
                            className="h-20 w-20 rounded-2xl"
                          />
                          <p className="  text-gray-300 font-bold">
                            {plan.recipe?.title
                              ? plan.recipe.title.length > 29
                                ? `${plan.recipe.title.slice(0, 27)}...`
                                : plan.recipe.title
                              : 'Untitled Recipe'}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  <p>No meals planned for this day.</p>
                )}
              </div>
            </div>

            {/* Plan Button */}
            <PlannerButton
              date={date}
              user={user}
              index={index}
              groupedPlanner={groupedPlanner}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
