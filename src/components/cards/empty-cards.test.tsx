import { render, screen } from '@testing-library/react';
import EmptyCards from './empty-cards';

describe('Component: EmptyCards', () => {
  it('should render correctly', () => {
    const expectedText = 'Нет товаров для покупки. Попробуйте изменить фильтры';

    render(<EmptyCards />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
