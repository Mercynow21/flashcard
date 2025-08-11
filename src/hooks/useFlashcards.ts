// src/hooks/useFlashcards.ts
import { useState, useEffect, useCallback } from 'react';
import { Flashcard } from '../data/flashcards';

// Define the shape of the statistics object
export interface CategoryStats {
  studied: number;
  correct: number;
  incorrect: number;
}

export interface Stats {
  [category: string]: CategoryStats;
}

// Custom hook for managing flashcard state
export const useFlashcards = () => {
  const [stats, setStats] = useState<Stats>({});
  const [wrongAnswers, setWrongAnswers] = useState<Flashcard[]>([]);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('flashcard-stats');
      if (savedStats) setStats(JSON.parse(savedStats));
      const savedWrongAnswers = localStorage.getItem('flashcard-wrong-answers');
      if (savedWrongAnswers) setWrongAnswers(JSON.parse(savedWrongAnswers));
    } catch (error) {
      console.error('Failed to parse state from localStorage', error);
    }
  }, []);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('flashcard-stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('flashcard-wrong-answers', JSON.stringify(wrongAnswers));
  }, [wrongAnswers]);

  // Update study statistics for a given category
  const updateStudyStats = useCallback((category: string, correctCount: number, incorrectCount: number) => {
    setStats((prev) => {
      const newStats = { ...prev };
      if (!newStats[category]) {
        newStats[category] = { studied: 0, correct: 0, incorrect: 0 };
      }
      newStats[category].studied += correctCount + incorrectCount;
      newStats[category].correct += correctCount;
      newStats[category].incorrect += incorrectCount;
      return newStats;
    });
  }, []);

  // Update quiz statistics for a given category
  const updateQuizStats = useCallback((category: string, score: number, total: number) => {
    setStats((prev) => {
      const newStats = { ...prev };
      if (!newStats[category]) {
        newStats[category] = { studied: 0, correct: 0, incorrect: 0 };
      }
      newStats[category].correct += score;
      newStats[category].incorrect += total - score;
      return newStats;
    });
  }, []);

  // Add a card to the list of wrong answers
  const addWrongAnswer = useCallback((card: Flashcard) => {
    setWrongAnswers((prev) => {
      if (prev.find((c) => c.spanish === card.spanish)) return prev;
      return [...prev, card];
    });
  }, []);

  // Remove a card from the list of wrong answers
  const removeWrongAnswer = useCallback((card: Flashcard) => {
    setWrongAnswers((prev) => prev.filter((c) => c.spanish !== card.spanish));
  }, []);
  
  // Clear all wrong answers
  const clearWrongAnswers = useCallback(() => {
    setWrongAnswers([]);
  }, []);

  // Reset all statistics
  const resetStats = useCallback(() => {
    setStats({});
  }, []);

  return {
    stats,
    wrongAnswers,
    updateStudyStats,
    updateQuizStats,
    addWrongAnswer,
    removeWrongAnswer,
    clearWrongAnswers,
    resetStats,
  };
};
