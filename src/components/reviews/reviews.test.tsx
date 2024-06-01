import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeReview } from '../../mocks';
import { StatusLoading } from '../../const';
import Reviews from './reviews';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const expectedText = 'Отзывы';
    const { withStoreComponent } = withStore(<Reviews />, { REVIEWS: {sortReviews: new Array(5).fill(null).map(() => makeFakeReview()), statusLoading: StatusLoading.Success} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Показать больше отзывов'})).toBeInTheDocument();
  });
});
