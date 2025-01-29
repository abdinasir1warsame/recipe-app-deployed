import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PopularRecipes from '../assets/components/searchPage/popularRecipes';
import Categories from '../assets/components/searchPage/categories';
import SearchBar from '../assets/components/searchPage/searchBar'; // Import SearchBar component

export default function SearchPage() {
  const [searchParam, setSearchParam] = useState('');
  const [filtersState, setFiltersState] = useState({
    diet: [],
    intolerance: [],
    dishType: [],
    cuisine: [],
    time: [],
    difficulty: [],
    rating: [],
  });
  const navigate = useNavigate();
  const apiKey3 = '74a1a3dced1b4192a47805e76e6bbcae';

  // API call for searched recipes
  async function fetchRecipeData(query, filters = {}) {
    const filterParams = [];

    // Build filter query only if filters are provided
    if (filters && typeof filters === 'object') {
      Object.keys(filters).forEach((category) => {
        filters[category].forEach((option) => {
          filterParams.push(`${category}=${encodeURIComponent(option)}`);
        });
      });
    }

    const filterQuery =
      filterParams.length > 0 ? `&${filterParams.join('&')}` : '';
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey3}&query=${query}&addRecipeInformation=true&number=100${filterQuery}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Unable to fetch data', error);
    }
  }

  // Triggered when searching via SearchBar
  const search = async () => {
    const query = searchParam.trim() || ''; // If no query, use an empty string

    try {
      const data = await fetchRecipeData(query, filtersState); // Pass filtersState for full search
      if (data) {
        navigate('/recipes', {
          state: { recipeData: data, searchParam: query },
        });
      }
      setSearchParam(''); // Reset the search parameter after searching
    } catch (error) {
      console.error('Error executing search:', error);
    }
  };

  // Triggered when clicking on a category
  const handleCategoryClick = async (category) => {
    console.log('Category clicked:', category);
    try {
      const data = await fetchRecipeData(category); // Omit filters for category-based searches
      if (data) {
        navigate('/recipes', {
          state: { recipeData: data, searchParam: category },
        });
      }
    } catch (error) {
      console.error('Error executing search:', error);
    }
  };

  return (
    <div className="">
      {/* Main Content */}
      <div className="flex-1 space-y-5 bg-base-200 text-gray-300 px-2 lg:px-10 xl:px-14 2xl:px-28 py-4 md-py-8 ml-0 lg:ml-64 min-h-screen mb-14 mt-7 lg:mt-0 lg:mb-0">
        <div className="space-y-7 md:space-y-10 items-center bg-base-200 text-gray-300 p-4 rounded-lg shadow-md">
          {/* SearchBar Component */}
          <SearchBar
            searchParam={searchParam}
            setSearchParam={setSearchParam}
            handleSearch={search}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
          />
        </div>

        {/* Categories */}
        <Categories handleCategoryClick={handleCategoryClick} />

        {/* Popular Recipes */}
        <PopularRecipes />
      </div>
    </div>
  );
}
