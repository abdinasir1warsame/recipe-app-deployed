import React from 'react';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import { addRecipeIcon } from '../../../shared/icons';
import { database } from '../../../assets/googleSignin/config';
import { userAuth } from '../../../context/AuthContext';

const AddToFavorite = ({ recipe, setSuccessMessage }) => {
  const { user } = userAuth();

  // Function to add recipe to Firestore
  const addRecipeToFirestore = async () => {
    if (!user) {
      setSuccessMessage(recipe.id, 'You must be logged in to add a recipe.');
      return;
    }

    try {
      // Check if the recipe already exists by querying the Firestore collection
      const recipeQuery = query(
        collection(database, 'recipes'),
        where('recipeId', '==', recipe.id) // Check for existing recipe with the same recipeId
      );

      const querySnapshot = await getDocs(recipeQuery);

      if (!querySnapshot.empty) {
        // If the recipe already exists, show a message and do not add it again
        setSuccessMessage(recipe.id, 'This recipe has already been added.');
        return;
      }

      // Recipe does not exist, proceed to add the recipe
      const recipeDoc = {
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        servings: recipe.servings,
        userId: user.uid, // Associate recipe with the current user
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(database, 'recipes'), recipeDoc);
      console.log('Recipe added with ID:', docRef.id);
      setSuccessMessage(recipe.id, 'Recipe successfully added to cook book!');
    } catch (error) {
      console.error('Error adding recipe to Firestore:', error);
      setSuccessMessage(recipe.id, 'Failed to add recipe to cook book.');
    }
  };

  return (
    <div>
      <button
        onClick={addRecipeToFirestore}
        className="btn btn-xs flex gap-2 hover:text-white hover:opacity-100"
      >
        {addRecipeIcon}
        CookBook
      </button>
    </div>
  );
};

export default AddToFavorite;
