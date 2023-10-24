

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  

import CreateCard from '../CreateCard';

describe('FlashcardForm', () => {

  test('should not allow adding flashcard without front side', async () => {
    
    render(<CreateCard />);
    
    const submitButton = screen.getByRole('button', { name: /add/i });
    
    await userEvent.click(submitButton);
    
    expect(screen.queryByRole('alert')).toHaveTextContent(/front side is required/i);
    
  });

  test('should not allow adding flashcard without back side', async () => {

    render(<CreateCard />);

    const frontInput = screen.getByLabelText(/front side/i);
    await userEvent.type(frontInput, 'Front side text');
    
    const submitButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(submitButton);

    expect(screen.queryByRole('alert')).toHaveTextContent(/back side is required/i);

  });

  test('should allow adding flashcard with front and back sides', async () => {

    render(<CreateCard />);

    const frontInput = screen.getByLabelText(/front side/i);
    await userEvent.type(frontInput, 'Front side text');

    const backInput = screen.getByLabelText(/back side/i);  
    await userEvent.type(backInput, 'Back side text');

    const submitButton = screen.getByRole('button', { name: /add/i });
    await userEvent.click(submitButton);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  });

});