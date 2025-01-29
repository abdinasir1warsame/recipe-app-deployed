import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appImg from '../../images/app-mochup1.png';
import appImg2 from '../../images/app-mockup2.png';
import { userAuth } from '../../../context/AuthContext';
import Login from '../../../pages/loginPage';
import Register from '../../../pages/signup';

export default function Banner() {
  const { user, logOut } = userAuth();
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Check if the location state has openLoginModal set to true
  useEffect(() => {
    if (location.state?.openLoginModal) {
      setIsLoginModalOpen(true);
    }
  }, [location.state]);

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

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
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <nav className="fixed navbar bg-base-100 z-50 px-5 lg:px-10 xl:px-20 flex justify-between text-lg font-bold">
        <div className="flex gap-20">
          <div className="flex items-center gap-2 py-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center text-white">
              <img
                src="https://img.icons8.com/color/50/000000/food.png"
                alt="Logo"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Flavor Layer</h1>
          </div>
          <div className="hidden lg:flex gap-10 text-white">
            <Link
              to={'./search'}
              className="hover:border-b-[1px] cursor-pointer"
            >
              Recipe Generator
            </Link>
            <div
              onClick={() => scrollToSection('pricing')}
              className="hover:border-b-[1px] cursor-pointer"
            >
              Pricing
            </div>
            <div
              onClick={() => scrollToSection('faq')}
              className="hover:border-b-[1px] cursor-pointer"
            >
              FAQ
            </div>
          </div>
        </div>
        {user ? (
          <button
            onClick={handleLogout}
            className="hidden lg:flex btn btn-outline text-gray-300 text-lg font-bold text-white"
          >
            Log out
          </button>
        ) : (
          <div className="hidden lg:flex gap-8">
            <button
              onClick={openLoginModal}
              className="hover:border-b-[1px] cursor-pointer text-white"
            >
              Login
            </button>
            <button
              onClick={openRegisterModal}
              className="btn btn-outline text-gray-300 text-lg font-bold text-white"
            >
              Get Started for free
            </button>
          </div>
        )}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="p-2 rounded-md text-white hover:text-gray-300 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 right-0 w-full pb-4 bg-base-100 shadow-lg">
            <div className="px-5 py-3 space-y-4">
              <Link
                to={'search'}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Recipe Generator
              </Link>
              <div
                onClick={() => scrollToSection('pricing')}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
              >
                Pricing
              </div>
              <div
                onClick={() => scrollToSection('faq')}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md "
              >
                FAQ
              </div>

              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-lg border text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    onClick={openLoginModal}
                    className=" text-lg border text-white hover:bg-gray-700 px-3 py-2 rounded-md mb-5"
                  >
                    Get Started for free
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
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
                className="text-white btn btn-md btn-outline text-lg sm:text-xl lg:text-2xl font-bold text-gray-300 px-8"
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
