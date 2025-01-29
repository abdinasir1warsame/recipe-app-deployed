import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { database } from '../assets/googleSignin/config'; // Adjust the path as necessary
import { userAuth } from '../context/AuthContext';
import { savedIcon, trashIcon } from '../shared/icons';
import { useNavigate } from 'react-router-dom';

export default function CookBook() {
  const { user } = userAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch recipes when the user is logged in
  useEffect(() => {
    const fetchRecipes = async () => {
      if (!user) return; // Exit if the user is not logged in

      try {
        // Create a Firestore query to get recipes associated with the user's ID
        const q = query(
          collection(database, 'recipes'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        const recipesArray = [];
        querySnapshot.forEach((doc) => {
          recipesArray.push({ id: doc.id, ...doc.data() });
        });

        setRecipes(recipesArray);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [user]);

  const handleRecipeClick = (recipeId) => {
    console.log('Recipe clicked:', recipeId); // Add this to debug
    navigate('/recipes/recipe', { state: { recipe: recipeId } });
  };

  // Function to delete recipe from Firestore
  const handleDeleteRecipe = async (recipeId) => {
    try {
      const recipeDoc = doc(database, 'recipes', recipeId);
      await deleteDoc(recipeDoc);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
      console.log('Recipe deleted:', recipeId);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="flex-1 space-y-10 bg-base-200 text-gray-300 px-2 lg:px-28 py-8 ml-0 xl:ml-64 min-h-screen">
      <div>
        <p className="text-4xl">Cook Book</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 px-8 md:px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="card card-compact bg-base-100 shadow-xl mb-7 relative "
            >
              <figure>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="object-cover"
                />
              </figure>
              <div
                onClick={() => handleRecipeClick(recipe.recipeId)}
                className="card-body space-y-2 cursor-pointer hover:opacity-80"
              >
                <div className="hover:text-white ">
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
              <div
                className="absolute top-1 right-2 font-bold text-base-200 rounded-xl p-1 backdrop-blur-md bg-white/30 group cursor-pointer"
                onClick={() => handleDeleteRecipe(recipe.id)} // Add delete functionality here
              >
                {/* Show trashIcon on hover (hidden by default) */}
                <span className="group-hover:hidden block">{savedIcon}</span>
                {/* Show trashIcon2 when parent is hovered */}
                <span className="group-hover:block hidden">{trashIcon}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
