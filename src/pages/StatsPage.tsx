// src/pages/StatsPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../hooks/useFlashcards';

const StatsPage: React.FC = () => {
  const { stats, resetStats } = useFlashcards();

  const categories = Object.keys(stats);

  // This function calculates the overall accuracy across all categories.
  // It returns "N/A" if there are no stats available.
  const calculateOverallAccuracy = () => {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    categories.forEach((category) => {
      totalCorrect += stats[category].correct;
      totalIncorrect += stats[category].incorrect;
    });
    const total = totalCorrect + totalIncorrect;
    return total > 0 ? ((totalCorrect / total) * 100).toFixed(2) : 'N/A';
  };

  // This is the main component for the statistics page.
  // It displays the overall accuracy and the stats for each category.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Statistics</h1>
      {categories.length === 0 ? (
        <p>
          No stats yet. Complete a study session or a quiz to see your
          progress!
        </p>
      ) : (
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">Overall Accuracy</h2>
            <p className="text-4xl font-bold text-blue-600">
              {calculateOverallAccuracy()}%
            </p>
          </div>
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category} className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold capitalize mb-2">
                  {category}
                </h3>
                <p>
                  <strong>Cards Studied:</strong> {stats[category].studied}
                </p>
                <p>
                  <strong>Correct Answers:</strong>{' '}
                  <span className="text-green-600">
                    {stats[category].correct}
                  </span>
                </p>
                <p>
                  <strong>Incorrect Answers:</strong>{' '}
                  <span className="text-red-600">
                    {stats[category].incorrect}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={resetStats}
            className="mt-8 w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          >
            Reset All Stats
          </button>
        </div>
      )}
      <Link to="/">
        <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default StatsPage;

