import React, { useState } from 'react';
import { filterConfig } from '../../../shared/filterLabels'; // Import filter configuration
import {
  searchIcon,
  filterIcon,
  chevronUp,
  chevronDown,
} from '../../../shared/icons';

export default function SearchBar({
  searchParam,
  setSearchParam,
  handleSearch,
  filtersState,
  setFiltersState,
}) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const handleFilterChange = (filterCategory, option) => {
    setFiltersState((prevState) => {
      const newState = { ...prevState };
      const filterList = newState[filterCategory] || [];
      if (filterList.includes(option)) {
        newState[filterCategory] = filterList.filter((item) => item !== option);
      } else {
        newState[filterCategory] = [...filterList, option];
      }
      return newState;
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="flex items-center w-full md:w-auto gap-2 pb-2">
        <input
          type="text"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
          placeholder="Search by title, ingredients, or content..."
          className="input input-bordered w-full md:w-80"
        />
        <button onClick={handleSearch} className="btn btn-ghost btn-square">
          {searchIcon}
        </button>
        <button
          className="btn btn-outline btn-sm px-2 flex gap-3"
          onClick={toggleFilters}
        >
          {filterIcon}
          Filter
          {showFilters ? chevronUp : chevronDown}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
          {filterConfig.map((filter, index) => (
            <div key={index} className="dropdown group dropdown-hover">
              <label
                tabIndex={index}
                className="btn btn-outline btn-sm flex gap-1"
              >
                {filter.icon}
                {filter.label}
              </label>
              <ul
                tabIndex={index}
                className="dropdown-content z-50  menu p-2 bg-base-100 bg-opacity-100 shadow rounded-box w-52 group-hover:block hidden"
              >
                {filter.options.map((option, idx) => (
                  <li key={idx}>
                    <label className="cursor-pointer">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={filtersState[filter.category]?.includes(
                          option
                        )}
                        onChange={() =>
                          handleFilterChange(filter.category, option)
                        }
                      />{' '}
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button
            className="btn hover:border-white shadow-md btn-sm bg-gray-800 hover:bg-gray-700"
            onClick={() => setFiltersState({})}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
