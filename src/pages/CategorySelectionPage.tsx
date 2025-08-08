// src/pages/CategorySelectionPage.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const categories = ['animals', 'food', 'verbs'];

const CategorySelectionPage: React.FC = () => {
  const location = useLocation();
  const mode = location.pathname.includes('/study') ? 'study' : 'quiz';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Select a Category</h1>
      <div className="space-y-4 flex flex-col">
        {categories.map((category) => (
          <Link
            to={`/${mode}/${category}`}
            key={category}
            className="w-64 px-4 py-2 text-center font-bold text-white capitalize bg-orange-500 rounded hover:bg-orange-700"
          >
            {category}
          </Link>
        ))}
      </div>
      <Link
        to="/"
        className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default CategorySelectionPage;

