import { pie } from '../../../shared/foodIcons';
import { useState } from 'react';

export default function Features() {
  const [plan, setPlan] = useState('annually');

  const plans = {
    monthly: [
      {
        name: 'Free',
        price: '€0',
        features: [
          'Store 20 recipes',
          '3 cookbooks',
          '3 AI recipes per month',
          '1 shopping list with limited items',
        ],
      },
      {
        name: 'Plus',
        price: '€2.99',
        features: [
          'Unlimited recipes',
          'Unlimited cookbooks',
          '10 AI recipes per month',
          'Unlimited shopping lists',
        ],
      },
      {
        name: 'Pro',
        price: '€5.99',
        features: [
          'Unlimited AI recipes',
          'Unlimited recipes',
          'Unlimited cookbooks',

          'Unlimited shopping lists',
          'Digitize recipes with scanner',
          'See the nutritional values of each recipe',
          'Create recipes from leftovers',
          'Food allergies & dietary preferences',
          'Better AI recipe creation',
        ],
      },
    ],
    annually: [
      {
        name: 'Free',
        price: '€0',
        features: [
          'Store 20 recipes',
          '3 cookbooks',
          '3 AI recipes per month',
          '1 shopping list with limited items',
        ],
      },
      {
        name: 'Plus',
        price: '€29.99',
        features: [
          'Unlimited recipes',
          'Unlimited cookbooks',
          '10 AI recipes per month',
          'Unlimited shopping lists',
        ],
      },
      {
        name: 'Pro',
        price: '€59.99',
        features: [
          'Unlimited AI recipes',
          'Unlimited recipes',
          'Unlimited cookbooks',

          'Unlimited shopping lists',
          'Digitize recipes with scanner',
          'See the nutritional values of each recipe',
          'Create recipes from leftovers',
          'Food allergies & dietary preferences',
          'Better AI recipe creation',
        ],
      },
    ],
    onetime: [
      {
        name: 'Free',
        price: '€0',
        features: [
          'Store 20 recipes',
          '3 cookbooks',
          '3 AI recipes per month',
          '1 shopping list with limited items',
        ],
      },
      {
        name: 'Plus',
        price: '€59.99',
        features: [
          'Unlimited recipes',
          'Unlimited cookbooks',
          '10 AI recipes per month',
          'Unlimited shopping lists',
        ],
      },
      {
        name: 'Pro',
        price: '€149.99',
        features: [
          'Unlimited AI recipes',
          'Unlimited recipes',
          'Unlimited cookbooks',

          'Unlimited shopping lists',
          'Digitize recipes with scanner',
          'See the nutritional values of each recipe',
          'Create recipes from leftovers',
          'Food allergies & dietary preferences',
          'Better AI recipe creation',
        ],
      },
    ],
  };

  return (
    <div className="bg-base-200 px-10 sm:px-5 md:px-7 lg:px-20 xl:px-20 ">
      {/* Features */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-2/3 xl:w-2/2 text-center lg:px-14 xl:px-20">
          <h2 className="text-primary text-md sm:text-xl lg:text-2xl font-bold">
            Pricing
          </h2>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5">
            Choose your plan
          </h3>
          <div role="tablist" className="tabs tabs-boxed bg-base-100 ">
            <button
              role="tab"
              className={`tab text-lg sm:text-xl lg:text-2xl ${
                plan === 'monthly' ? 'tab-active' : ''
              }`}
              onClick={() => setPlan('monthly')}
            >
              Monthly
            </button>
            <button
              role="tab"
              className={`tab text-lg sm:text-xl lg:text-2xl ${
                plan === 'annually' ? 'tab-active' : ''
              }`}
              onClick={() => setPlan('annually')}
            >
              Annually
            </button>
            <button
              role="tab"
              className={`tab text-lg sm:text-xl lg:text-2xl ${
                plan === 'onetime' ? 'tab-active' : ''
              }`}
              onClick={() => setPlan('onetime')}
            >
              One Time
            </button>
          </div>
        </div>

        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  py-10 gap-6">
          {plans[plan].map((tier, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-base-100 text-lg rounded-2xl shadow-xl border-[1px] shadow shadow-md shadow-black"
            >
              <div className="space-y-2 p-8">
                <h2 className="card-title text-gray-300 text-2xl  md:text-3xl lg:text-4xl ">
                  {tier.name}
                </h2>
                <h3 className="text-gray-500 text-md lg:text-xl 2xl:text-2xl">
                  {tier.features[0]}
                </h3>
                <p className="pb-3">
                  <span className="text-2xl sm:text-3xl lg:text-4xl  2xl:text-5xl text-gray-300">
                    {tier.price}
                  </span>
                  {plan !== 'onetime' && ' /month'}
                </p>
                <div className="border-b-[1px] "></div>
                {tier.features.map((feature, idx) => (
                  <p key={idx} className="pt-2 text-md sm:text-lg 2xl:text-xl">
                    {feature}
                  </p>
                ))}
              </div>
              <div className="card-actions justify-center py-8 text-gray-300">
                <button className="btn btn-outline gap-2 text-gray-300 text-lg hover:bg-primary hover:text-white shadow-lg ">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
