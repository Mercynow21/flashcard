// src/__tests__/StudyPage.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StudyPage from '../pages/StudyPage';
import { useFlashcards } from '../hooks/useFlashcards';
import { flashcards } from '../data/flashcards';

// Mock the useFlashcards hook
vi.mock('../hooks/useFlashcards');

// Mock the flashcards data to have a predictable state for tests
const mockFlashcards = flashcards.filter((fc) => fc.category === 'animals');

describe('StudyPage', () => {
  const mockUpdateStudyStats = vi.fn();
  const mockAddWrongAnswer = vi.fn();

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useFlashcards as jest.Mock).mockReturnValue({
      updateStudyStats: mockUpdateStudyStats,
      addWrongAnswer: mockAddWrongAnswer,
    });
  });

  it('renders a flashcard from the correct category', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudyPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the first card of the 'animals' category is displayed
    expect(screen.getByText(mockFlashcards[0].spanish)).toBeInTheDocument();
  });

  it('handles a correct answer', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudyPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Find the flashcard and flip it
    const flashcard = screen.getByText(mockFlashcards[0].spanish);
    fireEvent.click(flashcard);

    // Click the "I got it right" button
    const correctButton = screen.getByText('I got it right');
    fireEvent.click(correctButton);

    // Check that we didn't add it to wrong answers
    expect(mockAddWrongAnswer).not.toHaveBeenCalled();

    // Check if it advanced to the next card
    expect(screen.getByText(mockFlashcards[1].spanish)).toBeInTheDocument();
  });
  
  it('handles an incorrect answer', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudyPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Find the flashcard and flip it
    const flashcard = screen.getByText(mockFlashcards[0].spanish);
    fireEvent.click(flashcard);

    // Click the "I got it wrong" button
    const incorrectButton = screen.getByText('I got it wrong');
    fireEvent.click(incorrectButton);

    // Check that it was added to the wrong answers
    expect(mockAddWrongAnswer).toHaveBeenCalledWith(mockFlashcards[0]);

    // Check if it advanced to the next card
    expect(screen.getByText(mockFlashcards[1].spanish)).toBeInTheDocument();
  });

  it('shows the completion screen when all cards are answered', () => {
    render(
      <MemoryRouter initialEntries={['/study/animals']}>
        <Routes>
          <Route path="/study/:category" element={<StudyPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Answer all cards in the category
    mockFlashcards.forEach(card => {
      const flashcard = screen.getByText(card.spanish);
      fireEvent.click(flashcard);
      const correctButton = screen.getByText('I got it right');
      fireEvent.click(correctButton);
    });

    // Check for the completion message
    expect(screen.getByText('Study Session Complete!')).toBeInTheDocument();
    // Check that stats were updated
    expect(mockUpdateStudyStats).toHaveBeenCalled();
  });
});
