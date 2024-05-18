import { useCallback, useEffect } from 'react';

type ModalProps = {
  content: JSX.Element;
  handleButtonClick: () => void;
}

function Modal ({content, handleButtonClick}: ModalProps): JSX.Element {

  const onKeydown = useCallback(({key}: KeyboardEvent) => {
    if(key === 'Escape') {
      handleButtonClick();
    }
  }, [handleButtonClick]);

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [onKeydown]);

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleButtonClick}
        >
        </div>
        <div className="modal__content">
          {content}
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleButtonClick}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
