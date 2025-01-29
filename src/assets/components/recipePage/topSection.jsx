import React from 'react';
import { useState } from 'react';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
import {
  cookbookIcon,
  shareIcon,
  planIcon,
  showMoreIcon,
} from '../../../shared/icons';

import AddToPlanner from './addToPlan';

const TopSection = ({ user, recipe, recipeData, database }) => {
  const [successMessage2, setSuccessMessage2] = useState('');
  // Function to add recipe to Firestore
  const addRecipeToFirestore = async () => {
    console.log('click');
    console.log(user);

    if (!user) {
      setSuccessMessage2('You must be logged in to add a recipe.');
      return;
    }

    try {
      // Check if the recipe already exists by querying the Firestore collection
      const recipeQuery = query(
        collection(database, 'recipes'),
        where('recipeId', '==', recipe) // Check for existing recipe with the same recipeId
      );

      const querySnapshot = await getDocs(recipeQuery);

      if (!querySnapshot.empty) {
        // If the recipe already exists, show a message and do not add it again
        setSuccessMessage2('This recipe has already been added.');
        setTimeout(() => {
          setSuccessMessage2('');
        }, 2000);
        return;
      }

      // Recipe does not exist, proceed to add the recipe
      const recipeDoc = {
        recipeId: recipe,
        title: recipeData.title,
        image: recipeData.image,
        summary: recipeData.summary,
        servings: recipeData.servings,
        userId: user.uid, // Associate recipe with the current user
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(database, 'recipes'), recipeDoc);
      console.log('Recipe added with ID:', docRef.id);
      setSuccessMessage2('Recipe successfully added to cook book!');
      setTimeout(() => {
        setSuccessMessage2('');
      }, 2000);
    } catch (error) {
      console.error('Error adding recipe to Firestore:', error);
      setSuccessMessage2('Failed to add recipe to cook book.');
    }
  };

  return (
    <>
      <div className="px-2 lg:px-8 py-8 flex justify-between">
        <button
          onClick={addRecipeToFirestore}
          className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2"
        >
          {cookbookIcon} CookBook
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
          {shareIcon} Share
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
          {planIcon} <AddToPlanner recipeData={recipeData} />
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md flex gap-2">
          {showMoreIcon}
        </button>
      </div>
      {successMessage2 && (
        <div role="alert" className="alert alert-success flex justify-center">
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
    </>
  );
};

export default TopSection;
