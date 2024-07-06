import { render, screen } from '@testing-library/react';
import PaginationItem from './pagination-item';
import userEvent from '@testing-library/user-event';

describe('Component: PaginationItem', () => {
  it('should render correctly', () => {
    const expectedItemContainerTestId = 'pagination-item-container';
    const fakePage = 1;
    const fakeCurrentPage = 2;
    const fakeFunction = vi.fn();

    render(<PaginationItem page={fakePage} currentPage={fakeCurrentPage} onChangePage={fakeFunction}/>);

    expect(screen.getByTestId(expectedItemContainerTestId)).toBeInTheDocument();
  });

  it('should render correctly when "page" === "currentPage"', () => {
    const expectedItemContainerTestId = 'pagination-item-container';
    const fakePage = 2;
    const fakeCurrentPage = 2;
    const fakeFunction = vi.fn();

    render(<PaginationItem page={fakePage} currentPage={fakeCurrentPage} onChangePage={fakeFunction}/>);

    expect(screen.getByTestId(expectedItemContainerTestId).firstChild).toHaveClass('pagination__link--active');
  });
  it('should render correctly when "page" !== "currentPage"', () => {
    const expectedItemContainerTestId = 'pagination-item-container';
    const fakePage = 1;
    const fakeCurrentPage = 2;
    const fakeFunction = vi.fn();

    render(<PaginationItem page={fakePage} currentPage={fakeCurrentPage} onChangePage={fakeFunction}/>);

    expect(screen.getByTestId(expectedItemContainerTestId).firstChild).not.toHaveClass('pagination__link--active');
  });
  it('should working "onChangePage" when user click', async () => {
    const fakePage = 2;
    const fakeCurrentPage = 2;
    const fakeFunction = vi.fn();

    render(<PaginationItem page={fakePage} currentPage={fakeCurrentPage} onChangePage={fakeFunction}/>);
    await userEvent.click(screen.getByText(fakePage));

    expect(fakeFunction).toBeCalledTimes(1);
    expect(screen.getByText(fakePage)).toBeInTheDocument();
  });
});
