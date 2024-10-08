import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { selectError } from '../../store/order-process/order-process.selectors';

function FailMessageModal (): JSX.Element {

  const error = useAppSelector(selectError);

  return (
    <>
      <p className="title title--h4" data-testid="fail-container">{error}</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="fail"><path d="M8.3 15.7c.2.2.4.3.7.3s.5-.1.7-.3l2.3-2.3 2.3 2.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l2.3-2.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 9.7 8.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.3 2.3-2.3 2.3c-.4.4-.4 1 0 1.4z"></path><path d="M12 21c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9zm0-16c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7z"></path></svg>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"><Link to={AppRoute.Main}>Вернуться к покупкам</Link>
        </button>
      </div>
    </>
  );
}

export default FailMessageModal;
