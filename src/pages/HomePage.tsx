// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="text-xl mb-8 text-gray-600">Choose an activity to get started.</p>
      <div className="space-y-4 flex flex-col">
        <Link
          to="/study"
          className="w-64 px-4 py-2 text-center font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Study Mode
        </Link>
        <Link
          to="/quiz"
          className="w-64 px-4 py-2 text-center font-bold text-white bg-green-500 rounded hover:bg-green-700"
        >
          Quiz Mode
        </Link>
        <Link
          to="/stats"
          className="w-64 px-4 py-2 text-center font-bold text-white bg-purple-500 rounded hover:bg-purple-700"
        >
          Stats Page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

