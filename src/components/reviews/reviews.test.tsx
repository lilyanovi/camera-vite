import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeIdNumber, makeFakeReview } from '../../mocks';
import { StatusLoading } from '../../const';
import Reviews from './reviews';

describe('Component: Reviews', () => {
  it('should render correctly', () => {
    const expectedText = 'Отзывы';
    const fakeId = makeFakeIdNumber();
    const { withStoreComponent } = withStore(<Reviews id={fakeId}/>, {
      REVIEWS: {
        sortReviews: new Array(5).fill(null).map(() => makeFakeReview()),
        statusLoading: StatusLoading.Success,
        error: ''
      }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Показать больше отзывов'})).toBeInTheDocument();
  });
});
