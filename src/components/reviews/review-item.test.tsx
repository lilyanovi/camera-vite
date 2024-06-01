import { render, screen } from '@testing-library/react';
import ReviewItem from './review-item';
import { makeFakeReview } from '../../mocks';

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    const fakeReview = makeFakeReview();

    render(<ReviewItem review={fakeReview}/>);

    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});
