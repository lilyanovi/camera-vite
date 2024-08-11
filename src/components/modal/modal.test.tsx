import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Modal from './modal';
import userEvent from '@testing-library/user-event';

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const expectedModalContainerTestId = 'modal-container';
    const expectedText = 'Fake content';
    const fakeContent = <span>Fake content</span>;
    const fakeHandleClick = vi.fn();
    const { withStoreComponent } = withStore(<Modal content={fakeContent} onButtonClick={fakeHandleClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedModalContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should working "handleClick" when pressing Escape', async() => {
    const fakeContent = <span>Fake content</span>;
    const fakeHandleClick = vi.fn();
    const { withStoreComponent } = withStore(<Modal content={fakeContent} onButtonClick={fakeHandleClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.keyboard('{Escape}');

    expect(fakeHandleClick).toBeCalledTimes(1);
  });

  it('should working "handleClick" when user click on button', async() => {
    const fakeContent = <span>Fake content</span>;
    const fakeHandleClick = vi.fn();
    const { withStoreComponent } = withStore(<Modal content={fakeContent} onButtonClick={fakeHandleClick}/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(fakeHandleClick).toBeCalledTimes(1);
  });
});
