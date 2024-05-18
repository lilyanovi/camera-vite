import { Categories } from '../../const';
import { TCamera } from '../../types/camera';
import { getTypeForPhoto } from '../../utils';

type CallModalProps = {
  camera: TCamera;
};

function CallModal ({camera}: CallModalProps): JSX.Element {
  const {name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, vendorCode, level, type, category} = camera;

  return (
    <>
      <p className="title title--h4">Свяжитесь со мной</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/><img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name}/>
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{category === Categories.Video ? type : getTypeForPhoto(type)} {category.toLowerCase()}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
        </div>
      </div>
      <div className="custom-input form-review__item">
        <label>
          <span className="custom-input__label">Телефон
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </span>
          <input type="tel" name="user-tel" placeholder="Введите ваш номер" required/>
        </label>
        <p className="custom-input__error">Нужно указать номер</p>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Заказать
        </button>
      </div>
    </>
  );
}

export default CallModal;
