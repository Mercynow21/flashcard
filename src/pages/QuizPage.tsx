// src/pages/QuizPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import QuizComponent from '../components/QuizComponent';
import { useFlashcards } from '../hooks/useFlashcards';

const QuizPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { updateQuizStats } = useFlashcards();
  const categoryFlashcards = flashcards.filter(
    (card) => card.category === category
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // This effect hook updates the quiz statistics when the quiz is finished.
  // It is triggered when the `isFinished` state changes to true.
  useEffect(() => {
    if (isFinished && category) {
      updateQuizStats(category, score, categoryFlashcards.length);
    }
  }, [isFinished, category, updateQuizStats, score, categoryFlashcards.length]);

  // This function handles the user's answer for a quiz question.
  // It updates the score and advances to the next question.
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex >= categoryFlashcards.length) {
      setIsFinished(true);
    }
    setCurrentIndex(nextIndex);
  };

  // This component renders the completion screen when the quiz is over.
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Quiz Complete!</h1>
        <p className="text-xl">
          You scored {score} out of {categoryFlashcards.length}.
        </p>
        <Link to="/quiz">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Take Another Quiz
          </button>
        </Link>
      </div>
    );
  }

  // This component handles the case where there are no flashcards for the selected category.
  if (categoryFlashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">No cards in this category</h1>
        <Link to="/quiz">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Choose Another Category
          </button>
        </Link>
      </div>
    );
  }

  // This is the main component for the quiz page.
  // It displays the current quiz question and the navigation buttons.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Quiz Mode: <span className="capitalize">{category}</span>
      </h1>
      <QuizComponent
        card={categoryFlashcards[currentIndex]}
        onAnswer={handleAnswer}
      />
      <Link to="/quiz">
        <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Back to Category Selection
        </button>
      </Link>
    </div>
  );
};

export default QuizPage;

