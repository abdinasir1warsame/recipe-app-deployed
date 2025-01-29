import React from 'react';

function Footer() {
  return (
    <footer className="p-4 bg-base-100 md:p-8 lg:p-10 shadow-md">
      <div className="mx-auto max-w-screen-xl text-center">
        <div className="flex justify-center gap-5 items-center text-4xl font-semibold text-gray-300 dark:text-white">
          <img
            src="https://img.icons8.com/color/50/000000/food.png"
            alt="Logo"
          />
          Flavor Layer
        </div>
        <p className="my-6 text-gray-500 dark:text-gray-400 text-xl">
          Open-source library of over 400+ web components and interactive
          elements built for better web.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white text-lg">
          {[
            'About',
            'Premium',
            'Campaigns',
            'Blog',
            'Affiliate Program',
            'FAQs',
            'Contact',
          ].map((item, index) => (
            <li key={index}>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <span className=" text-gray-500 sm:text-center dark:text-gray-400">
          © 2021-2022{' '}
          <a href="#" className="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
