import React from 'react';
import Recipes from '../../../data/recipeCategories';

export default function Categories({ handleCategoryClick }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl">Categories</h1>
      <div className=" grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {Recipes.sort().map((recipe, index) => (
          <div
            key={recipe.id}
            className="mb-4 w-20 md:w-28 transform hover:scale-110 transition duration-300"
            onClick={() => handleCategoryClick(recipe.name)}
          >
            <div className="flex w-20 md:w-28 ">
              <img
                className="button-custom rounded-[100%] h-20 w-20 md:w-28 md:h-28 object-center object-cover hover:cursor-pointer"
                src={recipe.img}
                alt=""
              />
            </div>

            <h3 className=" text-lg text-center font-medium mt-2">
              {recipe.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
