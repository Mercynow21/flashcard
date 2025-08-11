// src/__tests__/CategorySelectionPage.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategorySelectionPage from '../pages/CategorySelectionPage';
import { useFlashcards } from '../hooks/useFlashcards';

// Mock the useFlashcards hook
vi.mock('../hooks/useFlashcards');

describe('CategorySelectionPage', () => {
  it('renders the categories', () => {
    (useFlashcards as jest.Mock).mockReturnValue({
      wrongAnswers: [],
    });

    render(
      <MemoryRouter initialEntries={['/study']}>
        <CategorySelectionPage />
      </MemoryRouter>
    );

    expect(screen.getByText('animals')).toBeInTheDocument();
    expect(screen.getByText('food')).toBeInTheDocument();
    expect(screen.getByText('verbs')).toBeInTheDocument();
  });

  it('does not show the redo button when there are no wrong answers', () => {
    (useFlashcards as jest.Mock).mockReturnValue({
      wrongAnswers: [],
    });

    render(
      <MemoryRouter initialEntries={['/study']}>
        <CategorySelectionPage />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Redo Incorrect Cards/)).not.toBeInTheDocument();
  });

  it('shows the redo button when there are wrong answers', () => {
    (useFlashcards as jest.Mock).mockReturnValue({
      wrongAnswers: [{ category: 'animals', spanish: 'el gato', english: 'the cat', quiz: { type: 'multiple-choice' } }],
    });

    render(
      <MemoryRouter initialEntries={['/study']}>
        <CategorySelectionPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Redo Incorrect Cards/)).toBeInTheDocument();
  });
});
