import React from 'react';

const CookingSteps = ({ method }) => (
  <div className="card shadow-md p-4 text-xl">
    <h2 className="text-2xl font-bold mb-4">Cooking Steps</h2>
    {method.length > 0 ? (
      method.map((step, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-2xl mb-4">Step {step.number}</h3>
          <p>{step.step}</p>
        </div>
      ))
    ) : (
      <p>No method instructions available.</p> // Fallback content
    )}
  </div>
);

export default CookingSteps;
