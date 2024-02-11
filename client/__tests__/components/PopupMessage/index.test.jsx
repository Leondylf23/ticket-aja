import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopupMessage from '@components/PopupMessage/Dialog';

describe('PopupMessage Component', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<PopupMessage />);
    const popupMessageComponent = getByTestId('popup-message');
    expect(popupMessageComponent).toBeInTheDocument();
  });

  it('renders the title and message correctly', () => {
    const title = 'Test Title';
    const message = 'Test Message';
    const { getByTestId } = render(
      <PopupMessage open={true} title={title} message={message} />
    );

    expect(getByTestId('popup-title').textContent).toBe(title);
    expect(getByTestId('popup-message-content').textContent).toBe(message);
  });

  it('calls onClose when button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(<PopupMessage open={true} onClose={onCloseMock} />);
    const closeButton = getByTestId('popup-close-button');

    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });

  it('uses default titles and messages if props are not provided', () => {
    const { getByTestId } = render(<PopupMessage open={true} />);
    const defaultTitle = getByTestId('popup-title').textContent;
    const defaultMessage = getByTestId('popup-message-content').textContent;

    expect(defaultTitle).toBe('app_popup_error_title');
    expect(defaultMessage).toBe('app_popup_error_message');
  });
});
