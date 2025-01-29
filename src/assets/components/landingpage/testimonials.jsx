import React from 'react';

const Testimonial = () => {
  return (
    <div className="space-y-16 mb-20">
      <div className="text-center px-2 ">
        <h2 className="text-primary text-md sm:text-xl lg:text-2xl font-bold">
          Testimonials
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5">
          See What Our Users Are Saying
        </h3>
      </div>
      <section className="space-y-2  md:space-y-3 px-10 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-5">
        <div className="">
          <div className="border-[1px] max-w-3xl px-4 py-8 rounded-2xl shadow-md text-center lg:py-10 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-lg sm:text-xl lg:text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
                  The AI recipe generation is a game-changer. I simply input the
                  ingredients I had on hand, and it created a delicious meal I
                  would never have thought of myself. Highly recommended for
                  anyone who loves to cook or experiment with food!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    Sarah Johnson
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Home Cook
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div></div>
        <div></div>
        <div className="">
          <div className="border-[1px] max-w-3xl px-4 py-8 rounded-2xl shadow-md text-center lg:py-10 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
                  " I absolutely love how this platform lets me manually search
                  for recipes by cuisine or specific dishes. It's like having an
                  entire cookbook and chef's advice rolled into one. The search
                  suggestions are always spot-on, making it effortless to find
                  recipes that match my taste or mood. A must-have tool for food
                  enthusiasts like me!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    David Miller
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Food Enthusiast
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div></div>
        <div></div>
        <div className="">
          <div className="border-[1px] max-w-3xl px-4 py-8 rounded-2xl shadow-md text-center lg:py-10 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
                  "The meal planner feature has been an absolute lifesaver for
                  my busy schedule. I can plan my meals for the week in advance
                  and save so much time and stress. Plus, it helps me stick to a
                  budget and reduce food waste. It's like having a personal
                  assistant for meal prep—perfect for any parent juggling a
                  hectic lifestyle!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    Emily Davis
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    Busy Parent
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
        <div></div>
        <div></div>
        <div className="">
          <div className="border-[1px] max-w-3xl px-4 py-8 rounded-2xl shadow-md text-center lg:py-10 lg:px-6">
            <figure className="max-w-screen-md mx-auto">
              <svg
                className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
              <blockquote>
                <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-900 dark:text-white">
                  "The ability to save my favorite recipes and access them
                  anytime is unmatched in convenience. Whether I'm cooking at
                  home or planning meals for a special occasion, everything I
                  need is just a click away. This app has truly elevated my
                  cooking game and made meal preparation a breeze!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-6 h-6 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                  <div className="pr-3 font-medium text-gray-900 dark:text-white">
                    Micheal Gough
                  </div>
                  <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                    CEO at Google
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
