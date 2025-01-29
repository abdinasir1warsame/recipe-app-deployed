import React from 'react';
import Fraction from 'fraction.js';
import { useState } from 'react';
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';

const Ingredients = ({
  ingredients,
  currentServings,

  selectedIngredients,
  setSelectedIngredients,
  user,
  database,
  handleIngredientCheck,
  changeServings,
}) => {
  const adjustIngredientAmount = (amount) =>
    (amount * currentServings) / (ingredients[0]?.servings || 1);
  const toFraction = (amount) => new Fraction(amount).toFraction(true);
  const [successMessage, setSuccessMessage] = useState('');
  const addToShoppingList = async () => {
    console.log('Selected Ingredients:', selectedIngredients);
    if (!user) {
      setSuccessMessage('You must be logged in to add a recipe.');
      return;
    }

    console.log('Selected Ingredients:', selectedIngredients);
    if (!selectedIngredients || selectedIngredients.length === 0) {
      console.log('No ingredients selected.');
      return; // Prevent further processing if no ingredients are selected
    }

    try {
      const ingredientsDoc = selectedIngredients.map((ingredient) => ({
        image: ingredient.image,
        name: ingredient.originalName,
        userId: user.uid, // Associate ingredient with the current user
        createdAt: new Date(),
      }));

      // Loop over each selected ingredient and check for duplicates
      for (let ingredient of ingredientsDoc) {
        const ingredientQuery = query(
          collection(database, 'ingredients'),
          where('name', '==', ingredient.name),
          where('userId', '==', user.uid)
        );

        // Check if the ingredient already exists in the database
        const querySnapshot = await getDocs(ingredientQuery);
        if (querySnapshot.empty) {
          // No duplicate, add the ingredient to Firestore
          await addDoc(collection(database, 'ingredients'), ingredient);
        } else {
          console.log(
            `Ingredient ${ingredient.name} already exists in the shopping list.`
          );
        }
      }

      // Clear the selected ingredients and show success message
      setSelectedIngredients([]);
      setSuccessMessage('Ingredients added to shopping list');
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    } catch (error) {
      console.error('Error adding ingredients to Firestore:', error);
      setSuccessMessage('Failed to add ingredients to Firestore.');
    }
  };

  return (
    <>
      {' '}
      {/* Ingredients */}
      <div className="card shadow-md p-4 text-xl">
        <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
        <div className="flex items-center gap-5 mb-8 text-2xl">
          {/* Show the current servings */}
          <span>
            {currentServings} serving{currentServings > 1 ? 's' : ''}
          </span>

          {/* Decrease servings */}
          <button
            className="btn btn-xs text-xl text-center btn-outline"
            onClick={() => changeServings(-1)} // Decrease servings
          >
            -
          </button>

          {/* Increase servings */}
          <button
            className="btn btn-xs text-xl btn-outline"
            onClick={() => changeServings(1)} // Increase servings
          >
            +
          </button>
        </div>

        {/* List of ingredients with adjusted amounts */}
        <ul className="list-disc list-inside flex flex-col gap-4">
          {ingredients.map((ingredient) => (
            <li className="flex gap-4" key={ingredient.id}>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onChange={() => handleIngredientCheck(ingredient)}
              />
              {/* Adjust ingredient amount based on current servings */}
              {toFraction(adjustIngredientAmount(ingredient.amount))}{' '}
              {ingredient.unit} {ingredient.originalName}
            </li>
          ))}
        </ul>

        {/* Add to shopping list button */}
        <div className=" gap-5 items-center py-10">
          {successMessage && (
            <div
              role="alert"
              className="alert alert-success flex justify-center"
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
              <span>{successMessage}</span>
            </div>
          )}
          <button
            onClick={addToShoppingList}
            className="btn btn-outline  text-lg "
          >
            Add to shopping list
          </button>
        </div>
      </div>
    </>
  );
};

export default Ingredients;
