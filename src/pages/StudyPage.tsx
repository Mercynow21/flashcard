// src/pages/StudyPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { flashcards } from '../data/flashcards';
import FlashcardComponent from '../components/FlashcardComponent';
import { useFlashcards } from '../hooks/useFlashcards';

const StudyPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { updateStudyStats, addWrongAnswer } = useFlashcards();
  const categoryFlashcards = flashcards.filter(
    (card) => card.category === category
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionWrongAnswers, setSessionWrongAnswers] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // This effect hook updates the study statistics when the study session is finished.
  // It is triggered when the `isFinished` state changes to true.
  useEffect(() => {
    if (isFinished && category) {
      updateStudyStats(
        category,
        categoryFlashcards.length - sessionWrongAnswers.length,
        sessionWrongAnswers.length
      );
    }
  }, [
    isFinished,
    category,
    updateStudyStats,
    categoryFlashcards.length,
    sessionWrongAnswers.length,
  ]);

  // This function handles the user's answer for a flashcard.
  // It updates the wrong answers list and advances to the next card.
  const handleAnswer = (isCorrect: boolean) => {
    if (!isCorrect) {
      addWrongAnswer(categoryFlashcards[currentIndex]);
      setSessionWrongAnswers([...sessionWrongAnswers, currentIndex]);
    }
    const nextIndex = currentIndex + 1;
    if (nextIndex >= categoryFlashcards.length) {
      setIsFinished(true);
    }
    setCurrentIndex(nextIndex);
  };
  
  // This component renders the completion screen when the study session is over.
  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold mb-8">Study Session Complete!</h1>
        <p className="text-xl">
          You got {categoryFlashcards.length - sessionWrongAnswers.length} out
          of {categoryFlashcards.length} correct.
        </p>
        {sessionWrongAnswers.length > 0 && (
          <Link to="/redo">
            <button className="mt-4 px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
              Redo Incorrect Cards
            </button>
          </Link>
        )}
        <Link to="/study">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Study Another Category
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
        <Link to="/study">
          <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
            Choose Another Category
          </button>
        </Link>
      </div>
    );
  }

  // This is the main component for the study page.
  // It displays the current flashcard and the navigation buttons.
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">
        Study Mode: <span className="capitalize">{category}</span>
      </h1>
      <FlashcardComponent
        card={categoryFlashcards[currentIndex]}
        onAnswer={handleAnswer}
      />
      <Link to="/study">
        <button className="mt-8 px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400">
          Back to Category Selection
        </button>
      </Link>
    </div>
  );
};

export default StudyPage;

