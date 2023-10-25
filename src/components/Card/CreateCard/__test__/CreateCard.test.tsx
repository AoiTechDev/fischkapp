

// import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';  
import {render, fireEvent, screen} from '@testing-library/react'
import CreateCard from '../CreateCard';
import { AppHeader } from '../../../Header/AppHeader';


describe('FlashcardForm', () => {

  test('should not allow adding flashcard without front side', async () => {
    
    render(<AppHeader/>)
    render(<CreateCard />);
    const spanElement = screen.getByTestId('cardsAmount');
    const initialValue = spanElement.textContent

    const plusButton = screen.getByRole('button', { name: /\+/i });
    await userEvent.click(plusButton);

    const nextButton = screen.getByRole('button', { name: /Next/i });
    await userEvent.click(nextButton);

    const submitButton = screen.getByRole('button', { name: /Save/i });
    
    await userEvent.click(submitButton);
    
    const updatedValue = spanElement.textContent

    expect(updatedValue).toBe(initialValue);
   // expect(screen.queryByRole('alert')).toHaveTextContent(/front side is required/i);
    
  });

 
});