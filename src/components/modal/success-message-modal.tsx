type SuccessMessageProps = {
  isBasket?: boolean;
  isReview?: boolean;
}

function SuccessMessageModal ({isBasket, isReview}: SuccessMessageProps): JSX.Element {

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
        {isReview || isBasket ?
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
          </button> :
          <>
            <a className="btn btn--transparent modal__btn" href="#">Продолжить покупки</a>
            <button className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
          </>}
      </div>
    </>
  );
}

export default SuccessMessageModal;
