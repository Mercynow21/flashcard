// src/components/QuizComponent.tsx
import React, { useState } from 'react';
import { Flashcard } from '../data/flashcards';

interface QuizComponentProps {
  card: Flashcard;
  onAnswer: (isCorrect: boolean) => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ card, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleMultipleChoiceClick = (option: string) => {
    if (isSubmitted) return;
    const correct = option === card.english;
    setIsCorrect(correct);
    setIsSubmitted(true);
    setTimeout(() => {
      onAnswer(correct);
      setIsSubmitted(false);
    }, 1500);
  };

  const handleFillInTheBlankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitted) return;
    const correct = userAnswer.toLowerCase() === card.english.toLowerCase();
    setIsCorrect(correct);
    setIsSubmitted(true);
    setTimeout(() => {
      onAnswer(correct);
      setIsSubmitted(false);
      setUserAnswer('');
    }, 1500);
  };

  const getFeedbackClasses = () => {
    if (!isSubmitted) return '';
    return isCorrect ? 'bg-green-200 border-green-500' : 'bg-red-200 border-red-500';
  };

  return (
    <div className={`w-full max-w-lg p-6 border-2 rounded-lg shadow-lg ${getFeedbackClasses()}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">{card.spanish}</h2>
      {card.quiz.type === 'multiple-choice' && card.quiz.options && (
        <div className="grid grid-cols-2 gap-4">
          {card.quiz.options.map((option) => (
            <button
              key={option}
              onClick={() => handleMultipleChoiceClick(option)}
              disabled={isSubmitted}
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {option}
            </button>
          ))}
        </div>
      )}
      {card.quiz.type === 'fill-in-the-blank' && (
        <form onSubmit={handleFillInTheBlankSubmit} className="flex flex-col items-center">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={isSubmitted}
            className="w-full px-4 py-2 mb-4 border rounded"
            placeholder="Your answer..."
          />
          <button
            type="submit"
            disabled={isSubmitted}
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      )}
      {isSubmitted && (
        <p className={`mt-4 text-center text-xl font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'Correct!' : `Wrong! The answer is: ${card.english}`}
        </p>
      )}
    </div>
  );
};

export default QuizComponent;
