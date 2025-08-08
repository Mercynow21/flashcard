// src/pages/StudyPage.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const StudyPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Study Mode: <span className="capitalize">{category}</span>
      </h1>
      <p>Flashcard study component will go here.</p>
      <Link to="/study">
        <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Back to Category Selection
        </button>
      </Link>
    </div>
  );
};

export default StudyPage;

