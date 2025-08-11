// src/components/FlashcardComponent.tsx
import React, { useState } from 'react';
import { Flashcard } from '../data/flashcards';

interface FlashcardComponentProps {
  card: Flashcard;
  onAnswer: (isCorrect: boolean) => void;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({ card, onAnswer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswerClick = (isCorrect: boolean) => {
    onAnswer(isCorrect);
    setIsFlipped(false);
  };

  return (
    <div
      className="w-96 h-64 border-2 rounded-lg shadow-lg cursor-pointer perspective"
      onClick={handleCardClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full flex items-center justify-center bg-white backface-hidden">
          <h2 className="text-3xl font-bold">{card.spanish}</h2>
        </div>
        <div className="absolute w-full h-full flex flex-col items-center justify-center bg-white rotate-y-180 backface-hidden">
          <h2 className="text-3xl font-bold">{card.english}</h2>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => handleAnswerClick(true)}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            >
              I got it right
            </button>
            <button
              onClick={() => handleAnswerClick(false)}
              className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            >
              I got it wrong
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardComponent;
