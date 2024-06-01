import { render, screen } from '@testing-library/react';
import RatingItem from './rating-item';

describe('Component: RatingItem', () => {
  it('should render correctly', () => {
    const expectedItemContainerTestId = 'rating-item-container';
    const fakeRating = 2;
    const fakeCurrentRate = 2;

    render(<RatingItem rating={fakeRating} currentRate={fakeCurrentRate}/>);

    expect(screen.getByTestId(expectedItemContainerTestId)).toBeInTheDocument();
  });

  it('should render correctly when "rating" > "currentRate"', () => {
    const expectedItemContainerTestId = 'rating-item-container';
    const fakeRating = 5;
    const fakeCurrentRate = 2;

    render(<RatingItem rating={fakeRating} currentRate={fakeCurrentRate}/>);

    expect(screen.getByTestId(expectedItemContainerTestId).firstChild).toContainHTML('<use xlink:href="#icon-full-star"/>');
  });

  it('should render correctly when "rating" = "currentRate"', () => {
    const expectedItemContainerTestId = 'rating-item-container';
    const fakeRating = 2;
    const fakeCurrentRate = 2;

    render(<RatingItem rating={fakeRating} currentRate={fakeCurrentRate}/>);

    expect(screen.getByTestId(expectedItemContainerTestId).firstChild).toContainHTML('<use xlink:href="#icon-full-star"/>');
  });

  it('should render correctly when "rating" < "currentRate"', () => {
    const expectedItemContainerTestId = 'rating-item-container';
    const fakeRating = 1;
    const fakeCurrentRate = 2;

    render(<RatingItem rating={fakeRating} currentRate={fakeCurrentRate}/>);

    expect(screen.getByTestId(expectedItemContainerTestId).firstChild).toContainHTML('<use xlink:href="#icon-star"/>');
  });
});
