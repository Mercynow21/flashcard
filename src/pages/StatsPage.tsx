// src/pages/StatsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const StatsPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Statistics</h1>
      <p>Stats will be displayed here.</p>
      <Link to="/">
        <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default StatsPage;

