import { useCallback, useEffect } from 'react';
import ReactFocusLock from 'react-focus-lock';

type ModalProps = {
  content: JSX.Element;
  onButtonClick: () => void;
}

function Modal ({content, onButtonClick}: ModalProps): JSX.Element {

  const onKeydown = useCallback(({key}: KeyboardEvent) => {
    if(key === 'Escape') {
      onButtonClick();
    }
  }, [onButtonClick]);

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [onKeydown]);

  return (
    <ReactFocusLock>
      <div className="modal is-active" data-testid="modal-container">
        <div className="modal__wrapper">
          <div
            className="modal__overlay"
            onClick={onButtonClick}
          >
          </div>
          <div className="modal__content">
            {content}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onButtonClick}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </ReactFocusLock>
  );
}

export default Modal;
