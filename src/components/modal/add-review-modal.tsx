import { useAppDispatch } from '../../hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessages, Length } from '../../const';
import { postReviewAction } from '../../store/api-actions';

type AddReviewModalProps = {
  cameraId: number;
  onButtonClick: () => void;
  onSuccessModalChange: () => void;
};

type TFormInput = {
  name: string;
  plus: string;
  minus: string;
  comment: string;
  rate: number | null;
}

function AddReviewModal ({cameraId, onButtonClick, onSuccessModalChange}: AddReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {register, handleSubmit, formState: { errors }} = useForm<TFormInput>({defaultValues: {
    name: '',
    plus: '',
    minus: '',
    comment: '',
    rate: null,
  }});

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    dispatch(postReviewAction({
      cameraId: cameraId,
      userName: data.name,
      advantage: data.plus,
      disadvantage: data.minus,
      review: data.comment,
      rating: Number(data.rate),
    })).then(() => {
      onButtonClick();
      onSuccessModalChange();
    });
  };

  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form>
          <div className="form-review__rate">
            <fieldset className={`rate form-review__item ${errors.rate ? 'is-invalid' : ''}`}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input className="visually-hidden" id="star-5" type="radio" value="5" {...register('rate',
                    {
                      required: ErrorMessages.Rate,
                    })}
                  />
                  <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                  <input className="visually-hidden" id="star-4" type="radio" value="4" {...register('rate',
                    {
                      required: ErrorMessages.Rate,
                    })}
                  />
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                  <input className="visually-hidden" id="star-3" type="radio" value="3" {...register('rate',
                    {
                      required: ErrorMessages.Rate,
                    })}
                  />
                  <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                  <input className="visually-hidden" id="star-2" type="radio" value="2" {...register('rate',
                    {
                      required: ErrorMessages.Rate,
                    })}
                  />
                  <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                  <input className="visually-hidden" id="star-1" type="radio" value="1" {...register('rate',
                    {
                      required: ErrorMessages.Rate,
                    })}
                  />
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                </div>
                <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">{ErrorMessages.Rate}</p>
            </fieldset>
            <div className={`custom-input form-review__item ${errors.name?.message ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  required
                  autoFocus
                  {...register('name',
                    {
                      required: ErrorMessages.Name.Required,
                      maxLength: {
                        value: Length.UserName.Max,
                        message: ErrorMessages.Name.MaxLength
                      },
                      minLength: {
                        value: Length.UserName.Min,
                        message: ErrorMessages.Name.MinLength
                      },
                    })}
                />
              </label>
              <p className="custom-input__error">{errors.name?.message}</p>
            </div>
            <div className={`custom-input form-review__item ${errors.plus?.message ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  required
                  {...register('plus',
                    {
                      required: ErrorMessages.Plus.Required,
                      maxLength: {
                        value: Length.Text.Max,
                        message: ErrorMessages.Plus.MaxLength
                      },
                      minLength: {
                        value: Length.Text.Min,
                        message: ErrorMessages.Plus.MinLength
                      },
                    })}
                />
              </label>
              <p className="custom-input__error">{errors.plus?.message}</p>
            </div>
            <div className={`custom-input form-review__item ${errors.minus?.message ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  required
                  {...register('minus',
                    {
                      required: ErrorMessages.Minus.Required,
                      maxLength: {
                        value: Length.Text.Max,
                        message: ErrorMessages.Minus.MaxLength
                      },
                      minLength: {
                        value: Length.Text.Min,
                        message: ErrorMessages.Minus.MinLength
                      },
                    })}
                />
              </label>
              <p className="custom-input__error">{errors.minus?.message}</p>
            </div>.
            <div className={`custom-textarea form-review__item ${errors.comment?.message ? 'is-invalid' : ''}`}>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('comment',
                    {
                      required: ErrorMessages.Comment.Required,
                      maxLength: {
                        value: Length.Text.Max,
                        message: ErrorMessages.Comment.MaxLength
                      },
                      minLength: {
                        value: Length.Text.Min,
                        message: ErrorMessages.Comment.MinLength
                      },
                    })}
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">{errors.comment?.message}</div>
            </div>
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            onClick={(event) => void handleSubmit(onSubmit)(event)}
          >Отправить отзыв
          </button>
        </form>
      </div>
    </>
  );
}

export default AddReviewModal;
