import { useEffect, useState } from 'react';
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path to your config file
import { userAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PlannerButton from '../assets/components/mealPlannerPage/mealPlannerPage';

export default function MealPlanner() {
  const [next7Days, setNext7Days] = useState([]);
  const [planner, setPlanner] = useState([]);
  const [groupedPlanner, setGroupedPlanner] = useState({});
  const [viewMode, setViewMode] = useState('next7Days'); // 'next7Days' or 'previousPlanned'

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

  // Update grouped planner based on the view mode
  useEffect(() => {
    const groupByDate = () => {
      const grouped = {};

      if (viewMode === 'next7Days') {
        const days = getNext7Days();
        days.forEach((day) => {
          grouped[day] = [];
        });

        planner.forEach((plan) => {
          if (days.includes(plan.date)) {
            grouped[plan.date].push(plan);
          }
        });
      } else if (viewMode === 'previousPlanned') {
        planner.forEach((plan) => {
          const planDate = new Date(plan.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (planDate < today) {
            if (!grouped[plan.date]) {
              grouped[plan.date] = [];
            }
            grouped[plan.date].push(plan);
          }
        });

        // Sort previous dates in ascending order
        const sortedGrouped = {};
        Object.keys(grouped)
          .sort((a, b) => new Date(a) - new Date(b))
          .forEach((key) => {
            sortedGrouped[key] = grouped[key];
          });

        return sortedGrouped;
      }

      return grouped;
    };

    setGroupedPlanner(groupByDate());
  }, [planner, viewMode]);

  const meals = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];

  const handleMealClick = (recipeId) => {
    navigate('/recipes/recipe', { state: { recipe: recipeId } });
  };
  const handleMealClick2 = (recipeId) => {
    navigate('/ai-recipe', { state: { recipeId: recipeId } });
  };
  const handleDeleteMeal = async (plannerId) => {
    try {
      const plannerDoc = doc(database, 'planner', plannerId);
      await deleteDoc(plannerDoc);
      setPlanner((prevPlanner) =>
        prevPlanner.filter((plan) => plan.id !== plannerId)
      );
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  return (
    <div className="flex-1 space-y-5 bg-base-200 text-base-content px-2 lg:px-10 xl:px-14 2xl:px-28 py-7 md-py-8 ml-0 lg:ml-64 min-h-screen mb-14 mt-9 lg:mt-0 lg:mb-0">
      <div className="lg:flex lg:flex-row lg:justify-between flex flex-col gap-5 lg:gap-0 px-3 lg:px-0">
        <h1 className="text-4xl font-bold ">Meal planner</h1>
        {/* View Mode Buttons */}
        <div className="flex gap-4 pb-4">
          <button
            onClick={() => setViewMode('next7Days')}
            className={`btn text-xl ${
              viewMode === 'next7Days' ? 'btn btn-outline ' : 'shadow shadow-xl'
            }`}
          >
            Next 7 Days
          </button>
          <button
            onClick={() => setViewMode('previousPlanned')}
            className={`btn text-xl ${
              viewMode === 'previousPlanned'
                ? 'btn btn-outline'
                : 'shadow shadow-xl'
            }`}
          >
            Previous Planned Days
          </button>
        </div>
      </div>

      {/* Planner Content */}
      <div className="space-y-4">
        {Object.keys(groupedPlanner).length > 0 ? (
          Object.keys(groupedPlanner).map((date, index) => (
            <div
              key={index}
              className="flex bg-base-100 justify-between items-center border-[1px] border-gray-500 shadow shadow-lg rounded-lg p-4"
            >
              <div>
                <div className="flex gap-4 ">
                  <span className="block text-2xl font-bold">{date}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mb-5">
                  {groupedPlanner[date]?.length > 0 ? (
                    groupedPlanner[date]
                      .sort(
                        (a, b) => meals.indexOf(a.meal) - meals.indexOf(b.meal)
                      )
                      .map((plan, idx) => (
                        <div key={idx} className="meal-item">
                          <div className="flex justify-between items-center">
                            <h2 className="text-xl py-2 mt-1">{plan.meal}</h2>
                            <div className="dropdown dropdown-bottom">
                              <div tabIndex={0} role="button" className="m-1">
                                ⋮
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-200 p-2 z-50 shadow rounded-box w-52"
                              >
                                <li onClick={() => handleDeleteMeal(plan.id)}>
                                  <a>Delete</a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div
                            onClick={() =>
                              plan.recipe.isAi
                                ? handleMealClick2(plan.recipe.id)
                                : handleMealClick(plan.recipe.id)
                            }
                            className="flex items-center gap-2 shadow-md pt-2 rounded-xl hover:cursor-pointer transform hover:scale-105 transition duration-300"
                          >
                            <img
                              src={
                                plan.recipe?.image || 'placeholder-image-url'
                              }
                              alt={plan.recipe?.title || 'Recipe Image'}
                              className="h-20 w-20 rounded-2xl"
                            />
                            <p className="text-gray-300 font-bold">
                              {plan.recipe?.title || 'Untitled Recipe'}
                            </p>
                          </div>
                        </div>
                      ))
                  ) : (
                    <p>No meals planned for this day.</p>
                  )}
                </div>
              </div>
              <PlannerButton
                date={date}
                user={user}
                index={index}
                groupedPlanner={groupedPlanner}
              />
            </div>
          ))
        ) : (
          <p>No data available for this view.</p>
        )}
      </div>
    </div>
  );
}
