import React, { useState } from 'react';
import appImg from '../../images/app-mochup1.png';
import appImg2 from '../../images/app-mockup2.png';
import { userAuth } from '../../../context/AuthContext';
import Login from '../../../pages/loginPage';
import Register from '../../../pages/signup';

export default function Banner() {
  const { user, logOut } = userAuth();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  // State to manage separate modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed navbar bg-base-100 z-50 px-20 flex justify-between text-lg font-bold">
        <div className="flex gap-20">
          <div className="flex items-center gap-2 py-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="https://img.icons8.com/color/50/000000/food.png"
                alt="Logo"
              />
            </div>
            <h1 className="text-2xl font-bold">Flavor Layer</h1>
          </div>
          <div className="flex gap-10">
            <div className="hover:border-b-[1px] cursor-pointer">Pricing</div>
            <div className="hover:border-b-[1px] cursor-pointer">Meal Prep</div>
            <div className="hover:border-b-[1px] cursor-pointer">
              Recipe Generator
            </div>
          </div>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline text-gray-300 text-lg font-bold"
          >
            Log out
          </button>
        ) : (
          <div className="flex gap-8">
            <button
              onClick={openLoginModal}
              className="hover:border-b-[1px] cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={openRegisterModal}
              className="btn btn-outline text-gray-300 text-lg font-bold"
            >
              Get Started for free
            </button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="hero bg-base-200 min-h-screen mt-32 lg:mt-10">
        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
            <dialog open className="modal ">
              <div className="bg-base-100 px-10 lg:px-0 py-5 rounded-2xl  w-[90%]   max-w-lg border-[1px] shadow-xl">
                <div
                  onClick={closeLoginModal}
                  className="flex justify-end px-5"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute "
                  >
                    ✕
                  </button>
                </div>

                <Login />
                <p className="text-lg font-light text-gray-500 dark:text-gray-400 text-center mt-4">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => {
                      closeLoginModal();
                      openRegisterModal();
                    }}
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </dialog>
          </div>
        )}

        {/* Register Modal */}
        {isRegisterModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
            <dialog open className="modal">
              <div className="bg-base-100 px-10 lg:px-0 py-5 w-[90%] rounded-2xl  max-w-2xl border-[1px] shadow-xl ">
                <div
                  onClick={closeRegisterModal}
                  className="flex justify-end px-5"
                >
                  <button
                    type="button"
                    className="btn btn-sm btn-circle btn-ghost absolute "
                  >
                    ✕
                  </button>
                </div>
                <Register />
                <p className="text-lg font-light text-gray-500 dark:text-gray-400 text-center mt-4">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    onClick={() => {
                      closeRegisterModal();
                      openLoginModal();
                    }}
                  >
                    Login here
                  </button>
                </p>
              </div>
            </dialog>
          </div>
        )}

        {/* Hero Content */}
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 2xl:gap-20 space-y-20 lg:space-y-0">
          <div className="text-center lg:text-start">
            <div className="px-4 sm:px-14 md:px-32 lg:px-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-extrabold">
                Manage all your recipes in one app.
              </h1>
              <p className="py-6 pr-10 text-lg sm:text-xl lg:text-2xl mb-4">
                Scan your handwritten recipes, create new ones with our AI, and
                import from websites.
              </p>
              <button
                onClick={openRegisterModal}
                className="btn btn-md btn-outline text-lg sm:text-xl lg:text-2xl font-bold text-gray-300 px-8"
              >
                Get Started for free
              </button>
            </div>
          </div>
          <div className="flex justify-center h-full gap-10 md:gap-20 lg:gap-5">
            <img
              src={appImg}
              className="max-w-sm rounded-lg shadow-2xl h-[350px] md:h-[450px] lg:h-[500px]"
              alt="App Mockup 1"
            />
            <img
              src={appImg2}
              className="max-w-sm rounded-lg shadow-2xl h-[350px] md:h-[450px] lg:h-[500px]"
              alt="App Mockup 2"
            />
          </div>
        </div>
      </div>
    </>
  );
}
