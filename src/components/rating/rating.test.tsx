import { render, screen } from '@testing-library/react';
import Rating from './rating';
import { RatingItems } from '../../const';

describe('Component: Rating', () => {
  it('should render correctly', () => {
    const expectedItemContainerTestId = 'rating-item-container';
    const fakeRating = 2;

    render(<Rating rating={fakeRating} />);

    expect(screen.getAllByTestId(expectedItemContainerTestId)).toHaveLength(RatingItems.length);
  });
});
