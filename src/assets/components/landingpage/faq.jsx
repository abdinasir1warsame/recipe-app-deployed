import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How does the AI recipe generation work?',
      answer:
        'Our AI uses advanced algorithms to generate unique recipes based on the ingredients or preferences you provide. Simply input your preferences, and the AI will create a recipe tailored to your needs.',
    },
    {
      question: 'Can I search for recipes manually?',
      answer:
        'Yes! Use the search feature to find recipes from a vast collection. You can browse by ingredients, cuisines, or specific dishes.',
    },
    {
      question: 'How can I save a recipe to my favorites?',
      answer:
        "When you find a recipe you like, click the 'Save to Favorites' button. You can access your saved recipes anytime from the Favorites section.",
    },
    {
      question: 'How do I add missing ingredients to my shopping list?',
      answer:
        "Each recipe has an option to add missing ingredients directly to your shopping list. Simply select the ingredients you need, and they'll be added for easy access.",
    },
    {
      question: 'Can I plan meals for specific days or weeks?',
      answer:
        'Yes, you can use the meal planner feature to organize your recipes by days or weeks. Drag and drop recipes into your schedule to create a personalized meal plan.',
    },
    {
      question: 'Is my data saved securely?',
      answer:
        'Absolutely! We prioritize your privacy and ensure all your data, including saved recipes and shopping lists, is securely stored.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 py-10 md:py-20 lg:py-40 px-8 lg:px-5">
      <div className="text-center py-5">
        <h2 className="text-primary text-md sm:text-xl lg:text-2xl font-bold">
          Everything You Should Know
        </h2>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5">
          Frequently asked questions
        </h3>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <div
              className="flex justify-between items-center p-4 cursor-pointer bg-base-300"
              onClick={() => toggleAccordion(index)}
            >
              <h3 className="font-medium text-xl lg:text-2xl">
                {faq.question}
              </h3>
              <span className="text-xl g:text-2xl">
                {activeIndex === index ? '−' : '+'}
              </span>
            </div>
            {activeIndex === index && (
              <div className="p-4 py-5 lg:text-xl border-t backdrop-blur bg-black/10">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
