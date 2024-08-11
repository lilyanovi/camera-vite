import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type SuccessMessageProps = {
  isBasket?: boolean;
  isReview?: boolean;
  isProduct?: boolean;
  isCard?: boolean;
  onButtonClick: () => void;
}

function SuccessMessageModal ({isBasket, isReview, isProduct, isCard, onButtonClick}: SuccessMessageProps): JSX.Element {

  const getTitleText = () => {
    if(isBasket){
      return 'Спасибо за покупку';
    }
    if(isReview){
      return 'Спасибо за отзыв';
    }
    return 'Товар успешно добавлен в корзину';
  };

  return (
    <>
      <p className="title title--h4">{getTitleText()}</p>
      <svg className="modal__icon" width={isReview || isBasket ? 80 : 86} height={isReview || isBasket ? 78 : 80} aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        {isReview && <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={onButtonClick}>Вернуться к покупкам</button>}
        {isBasket && <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button"><Link to={AppRoute.Main}>Вернуться к покупкам</Link></button>}
        {isProduct && <Link className="btn btn--transparent modal__btn" to={AppRoute.Main} >Продолжить покупки</Link>}
        {isCard && <button className="btn btn--transparent modal__btn" type="button" onClick={onButtonClick}>Продолжить покупки</button>}
        {isProduct || isCard ? <button className="btn btn--purple modal__btn modal__btn--fit-width"><Link to={AppRoute.Cart}>Перейти в корзину</Link></button> : ''}
      </div>
    </>
  );
}

export default SuccessMessageModal;
