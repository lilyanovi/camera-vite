import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessages, PatternsForCheck, StatusLoading } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkCouponAction } from '../../store/api-actions';
import { ChangeEvent, useEffect, useState } from 'react';
import { selectError, selectPromo, selectStatusLoadingCheck } from '../../store/cart-process/cart-process.selectors';
import { toast } from 'react-toastify';
import { changePromo, clearError } from '../../store/cart-process/cart-process.slice';
import { selectStatusLoadingPost } from '../../store/order-process/order-process.selectors';
import { getPromo } from '../../services/cart';


type TFormInput = {
  promo: string;
}

function PromoCode (): JSX.Element {
  const [valuePromo, setValuePromo] = useState('');

  const dispatch = useAppDispatch();

  const promoCode = useAppSelector(selectPromo);
  const error = useAppSelector(selectError);
  const statusLoadingCheck = useAppSelector(selectStatusLoadingCheck);
  const statusLoadingPost = useAppSelector(selectStatusLoadingPost);

  const isLoading = statusLoadingPost === StatusLoading.Loading || statusLoadingCheck === StatusLoading.Loading;

  const {register, handleSubmit, setValue, formState: { errors }} = useForm<TFormInput>({defaultValues: {promo: ''}});

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    dispatch(checkCouponAction(data.promo));
  };

  useEffect(() => {
    if(error){
      toast.warn(error, {
        position: 'bottom-right'
      });
    }
  }, [error, dispatch]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const localPromo = getPromo();
      if (localPromo !== ''){
        dispatch(changePromo({
          promo: localPromo
        }));
        setValue('promo', localPromo);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, setValue]);

  setTimeout(() => {
    if(error){
      dispatch(clearError());
    }
  }, 3000);

  return (
    <div className="basket__promo">
      <p className="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#">
          <div className={`custom-input ${errors.promo || error ? 'is-invalid' : ''} ${promoCode !== '' && promoCode === valuePromo ? 'is-valid' : ''}`}>
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                {...register('promo',
                  {
                    onChange: (event: ChangeEvent<HTMLInputElement>) => setValuePromo(event.target.value),
                    required: ErrorMessages.Promo,
                    pattern: {
                      value: PatternsForCheck.Promo,
                      message: ErrorMessages.Promo
                    }
                  })}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            className="btn"
            type="submit"
            onClick={(event) => void handleSubmit(onSubmit)(event)}
            disabled={isLoading}
          >Применить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PromoCode;
