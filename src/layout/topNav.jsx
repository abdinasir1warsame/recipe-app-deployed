import { Link } from 'react-router-dom';
export default function TopNav() {
  return (
    <>
      <div className="fixed z-50 block lg:hidden bg-base-300 top-0 w-full  text-gray-300 flex justify-around items-center py-3 shadow-lg h-10">
        {/* numer */}
        <div className="flex flex-col items-center">
          <span className="text-sm">AW</span>
        </div>

        {/* title */}
        <div className="flex items-center gap-2 ">
          <div className="rounded-full w-7 h-7 flex items-center justify-center">
            <img src="https://img.icons8.com/color/50/000000/food.png" alt="" />
          </div>
          <h1 className="text-lg font-bold">Flavor Layer</h1>
        </div>

        {/* Profile */}
        <Link to={'./profile'} className=" cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
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
        </Link>
      </div>
    </>
  );
}
