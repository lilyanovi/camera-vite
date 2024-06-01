import { render, screen } from '@testing-library/react';
import EmptyReviews from './empty-reviews';


describe('Component: EmptyReviews', () => {
  it('should render correctly', () => {
    const expectedText = 'Никто ещё не оставлял отзывов на данный товар';

    render(<EmptyReviews/>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
