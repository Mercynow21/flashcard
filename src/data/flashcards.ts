export interface Flashcard {
  category: string;
  spanish: string;
  english: string;
  quiz: {
    type: 'multiple-choice' | 'fill-in-the-blank';
    options?: string[];
  };
}

export const flashcards: Flashcard[] = [
  // Animals
  {
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the house', 'the cat', 'the bird'],
    },
  },
  {
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the fish', 'the dog', 'the horse'],
    },
  },
  {
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  // Food
  {
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the orange', 'the banana', 'the apple', 'the bread'],
    },
  },
  {
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  {
    category: 'food',
    spanish: 'el queso',
    english: 'the cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['the milk', 'the cheese', 'the water', 'the juice'],
    },
  },
  // Verbs
  {
    category: 'verbs',
    spanish: 'correr',
    english: 'to run',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
  {
    category: 'verbs',
    spanish: 'hablar',
    english: 'to speak',
    quiz: {
      type: 'multiple-choice',
      options: ['to eat', 'to drink', 'to speak', 'to sleep'],
    },
  },
  {
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'fill-in-the-blank',
    },
  },
];

