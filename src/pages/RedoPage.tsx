// src/pages/RedoPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../hooks/useFlashcards';
import FlashcardComponent from '../components/FlashcardComponent';

const RedoPage: React.FC = () => {
  const { wrongAnswers, removeWrongAnswer, clearWrongAnswers } = useFlashcards();
  const [currentIndex, setCurrentIndex] = useState(0);

  // This function handles the user's answer for a flashcard in the redo session.
  // If the answer is correct, the card is removed from the wrong answers list.
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      removeWrongAnswer(wrongAnswers[currentIndex]);
    }
    setCurrentIndex(currentIndex + 1);
  };

  // This component handles the case where there are no incorrect cards to redo.
  if (wrongAnswers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">No incorrect cards to redo!</h1>
        <Link to="/study">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Back to Study
          </button>
        </Link>
      </div>
    );
  }

  // This component renders the completion screen when the redo session is over.
  if (currentIndex >= wrongAnswers.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Redo Session Complete!</h1>
        <p className="text-xl">You've reviewed all your incorrect cards.</p>
        <Link to="/study">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Back to Study
          </button>
        </Link>
      </div>
    );
  }

  // This is the main component for the redo page.
  // It displays the current flashcard and the navigation buttons.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Redo Incorrect Cards</h1>
      <FlashcardComponent
        card={wrongAnswers[currentIndex]}
        onAnswer={handleAnswer}
      />
      <div className="flex space-x-4">
        <Link to="/study">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Back to Study
          </button>
        </Link>
        <button
          onClick={clearWrongAnswers}
          className="mt-8 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Clear All Wrong Answers
        </button>
      </div>
    </div>
  );
};

export default RedoPage;
