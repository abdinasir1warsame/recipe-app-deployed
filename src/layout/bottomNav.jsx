export default function BottomNav() {
  return (
    <>
      {/* bottom nav */}
      <div className="fixed block lg:hidden z-50 bottom-0 w-full bg-base-300  text-gray-300 flex justify-around items-center py-3 shadow-lg h-16">
        {/* Recipes */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 1.343-3 3 0 1.858 2.219 3.216 2.516 3.453.149.112.344.112.493 0C12.781 14.216 15 12.858 15 11c0-1.657-1.343-3-3-3z"
            />
          </svg>
          <span className="text-sm">Recipes</span>
        </div>

        {/* Shopping */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18l-2 10H5L3 3zm7 13a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4z"
            />
          </svg>
          <span className="text-sm">Shopping</span>
        </div>

        {/* Add */}
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 flex items-center justify-center bg-white text-black rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>

        {/* Cookbooks */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 4h10M7 16h10M7 20h10M7 8h10M7 12h10"
            />
          </svg>
          <span className="text-sm">Cookbooks</span>
        </div>

        {/* Profile */}
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-3 4a6 6 0 00-6 6h12a6 6 0 00-6-6z"
            />
          </svg>
          <span className="text-sm">Profile</span>
        </div>
      </div>
    </>
  );
}
