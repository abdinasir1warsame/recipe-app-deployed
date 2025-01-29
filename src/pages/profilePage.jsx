import { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';
import { data } from 'autoprefixer';

const ProfileSection = () => {
  const { user } = userAuth();
  const [totalIngredients, setTotalIngredients] = useState('');
  const [totalPlanner, setTotalPlanner] = useState('');
  const [totalRecipes, setTotalRecipes] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Define paths for the user's data
        const ingredientsRef = collection(database, 'ingredients');
        const plannerRef = collection(database, 'planner');
        const recipesRef = collection(database, 'recipes');

        const userQuery = (ref) => query(ref, where('userId', '==', user.uid));

        const [ingredientsSnap, plannerSnap, recipesSnap] = await Promise.all([
          getDocs(userQuery(ingredientsRef)),
          getDocs(userQuery(plannerRef)),
          getDocs(userQuery(recipesRef)),
        ]);

        // Convert snapshots to arrays
        const ingredients = ingredientsSnap.docs.map((doc) => doc.data());
        const planner = plannerSnap.docs.map((doc) => doc.data());
        const recipes = recipesSnap.docs.map((doc) => doc.data());

        setTotalIngredients(ingredients.length);
        setTotalPlanner(planner.length);
        setTotalRecipes(recipes.length);

        // Example: Calculate arrays and active days
        const dataSummary = {
          totalIngredients: ingredients.length,
          totalPlanner: planner.length,
          totalRecipes: recipes.length,
        };

        console.log('Data Summary:', dataSummary);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [user]);
  return (
    <div className="flex-1 justify-center items-center bg-base-200 text-gray-300 px-8 lg:px-10 xl:px-14 2xl:px-28 py-10 md-py-8 ml-0 lg:ml-64 min-h-screen mb-14 mt-9 lg:mt-0 lg:mb-0">
      <div className="space-y-5">
        {/* Profile Header */}
        <div className="flex items-center gap-4 pb-4">
          <div className="avatar">
            <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold">{user.displayName}</h1>
            <p className="text-xl text-gray-600">AI Recipe Enthusiast</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Meal Planner */}
          <div className="bg-base-100 shadow-md p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Meal Planner</h2>
            <div
              className="radial-progress text-primary"
              style={{ '--value': 75 }}
            >
              {totalPlanner}/21
            </div>
            <p className="mt-2 text-gray-300">Meals Planned</p>
          </div>

          {/* Shopping List */}
          <div className="bg-base-100 shadow-md p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Shopping List</h2>
            <div
              className="radial-progress text-primary"
              style={{ '--value': 40 }}
            >
              {totalIngredients}/20
            </div>
            <p className="mt-2 text-gray-300">Items in List</p>
          </div>

          {/* My Created Recipes */}
          <div className="bg-base-100 shadow-md p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">AI Generated Recipes</h2>
            <div
              className="radial-progress text-primary"
              style={{ '--value': 90 }}
            >
              2/10
            </div>
            <p className="mt-2 text-gray-300">Total Recipes</p>
          </div>

          {/* Favorites */}
          <div className="bg-base-100 shadow-md p-4 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Favourites</h2>
            <p className="text-4xl font-bold text-primary">{totalRecipes}</p>
            <p className="mt-2 text-gray-300">Saved to Cook Book</p>
          </div>

          {/* General Stats */}
          <div className="bg-base-100 shadow-md p-4 rounded-lg col-span-2 text-center">
            <h2 className="text-xl font-semibold mb-2">General Stats</h2>
            <p className="text-gray-300">
              You’ve been active for <strong>120 days</strong>, created{' '}
              <strong>45 recipes</strong>, and planned <strong>15 meals</strong>
              !
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 pb-8 gap-7 ">
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Invite people</h2>
              <p>
                It would really mean a lot to us if you would invite your
                family, friends or colleagues to Mr. Cook.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline gap-2 text-gray-300">
                  <span>
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
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </span>
                  invite people
                </button>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 w-full shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Feedback</h2>
              <p>
                Please let me know what you think about Mr. Cook so I can
                continue to improve the app.
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline gap-2 text-gray-300">
                  <span>
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
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </span>
                  Feedback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <button className="btn btn-outline btn-lg gap-3 text-lg">
            <span>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            Add New Recipe
          </button>
          <button className="btn btn-outline btn-lg ml-4 gap-3 text-lg">
            <span>
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
                  d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                />
              </svg>
            </span>
            View Planner
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
