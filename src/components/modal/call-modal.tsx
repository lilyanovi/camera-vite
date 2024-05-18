import { SubmitHandler, useForm } from 'react-hook-form';
import { Categories, ErrorMessages, PatternsForCheck } from '../../const';
import { TCamera } from '../../types/camera';
import { getPhoneByPost, getTypeForPhoto } from '../../utils';
import { useAppDispatch } from '../../hooks';
import { postOrderPhoneAction } from '../../store/api-actions';

type CallModalProps = {
  camera: TCamera;
};

type TFormInput = {
  phone: string;
}

function CallModal ({camera}: CallModalProps): JSX.Element {
  const {name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, vendorCode, level, type, category} = camera;

  const {register, handleSubmit, formState: { errors }} = useForm<TFormInput>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    const phoneByPost = getPhoneByPost(data.phone);
    dispatch(postOrderPhoneAction(phoneByPost));
  };

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
      <div className={`custom-input form-review__item ${errors.phone ? 'is-invalid' : ''}`}>
        <label>
          <span className="custom-input__label">Телефон
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </span>
          <input

            placeholder="Введите ваш номер"
            {...register('phone',
              {
                required: ErrorMessages.PHONE.Required,
                pattern: {
                  value: PatternsForCheck.PHONE,
                  message: ErrorMessages.PHONE.Pattern
                }
              })}
          />
        </label>
        <p></p>
        <p className="custom-input__error">{errors.phone?.message}</p>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={(event) => void handleSubmit(onSubmit)(event)}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Заказать
        </button>
      </div>
    </>
  );
}

export default CallModal;
