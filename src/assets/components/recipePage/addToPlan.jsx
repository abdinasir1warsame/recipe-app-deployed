import { useState, useEffect } from 'react';
import {
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
} from 'firebase/firestore';
import { database } from '../../../assets/googleSignin/config';

import { userAuth } from '../../../context/AuthContext';

export default function AddToPlanner({ recipeData }) {
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [next7Days, setNext7Days] = useState([]);
  const [usedMeals, setUsedMeals] = useState([]);

  const { user } = userAuth();
  const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

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

  // Fetch planner data for the selected date
  useEffect(() => {
    if (selectedDate && user) {
      const plannerQuery = query(
        collection(database, 'planner'),
        where('userId', '==', user.uid),
        where('date', '==', selectedDate)
      );

      const unsubscribe = onSnapshot(plannerQuery, (querySnapshot) => {
        const usedMeals = querySnapshot.docs.map((doc) => doc.data().meal);
        setUsedMeals(usedMeals);
      });

      return () => unsubscribe();
    }
  }, [selectedDate, user]);

  const openModal = (recipe) => {
    document.getElementById('my_modal_3').showModal();
  };

  const addToPlanner = async () => {
    if (!selectedMeal || !selectedDate || !user) return;

    if (usedMeals.length >= meals.length) {
      alert('This day is at full capacity. Please choose another day.');
      return;
    }
    // Transform recipeData into the required format
    const recipe = {
      id: recipeData.id,
      image: recipeData.image,
      sourceUrl: recipeData.sourceUrl,
      title: recipeData.title,
    };
    try {
      await addDoc(collection(database, 'planner'), {
        date: selectedDate,
        meal: selectedMeal,
        recipe: recipe,
        userId: user.uid,
        createdAt: new Date(),
      });
      document.getElementById('my_modal_3').close();
      setSelectedMeal('');
      setSelectedDate('');
    } catch (error) {
      console.error('Error adding to planner:', error);
    }
  };

  const availableMeals = meals.filter((meal) => !usedMeals.includes(meal));

  return (
    <>
      <div className="relative px-3">
        <button
          onClick={openModal}
          className="px-4 py-2 text-lg font-semibold btn btn-md rounded-lg transition flex gap-3"
        >
          <span>Meal Planner</span>
        </button>

        <dialog id="my_modal_3" className="modal backdrop-blur bg-black/40">
          <div className="modal-box backdrop-blur-md bg-black/50 z-2 border border-gray-300 h-[65%] overflow-visible text-start text-left space-y-4">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h2 className="font-bold text-xl text-white ">
              Organize your Meals
            </h2>
            <h3 className="py-2">Choose a date and category for this recipe</h3>

            <div className="py-3 space-y-4 text-white mt-7 text-xl">
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

            <div className="py-3 space-y-4  text-white text-lg">
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
                  {availableMeals.map((meal, i) => (
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

            {availableMeals.length === 0 && (
              <p className="text-red-500 mt-2 py-2 px-4 text-center">
                This day's meal plan is complete. Remove a meal to make space.
              </p>
            )}

            <div className="flex justify-center flex-col items-center">
              <button
                onClick={addToPlanner}
                className="block btn btn-outline text-lg text-white mt-4"
                disabled={availableMeals.length === 0}
              >
                Add to Planner
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
