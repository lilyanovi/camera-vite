import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectPromoProducts } from '../../store/cameras-process/cameras-process.selectors';
import { AppRoute, BANNER_CHANGE_TIME } from '../../const';
import { useCallback, useEffect, useState } from 'react';

function Banner (): JSX.Element {

  const promoProducts = useAppSelector(selectPromoProducts);
  const [currentPromo, setCurrentPromo] = useState<number>(0);

  const changeCurrentPromo = useCallback(() => {
    if(currentPromo < promoProducts.length - 1) {
      setCurrentPromo(currentPromo + 1);
    } else {
      setCurrentPromo(0);
    }
  }, [currentPromo, promoProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      changeCurrentPromo();
    }, BANNER_CHANGE_TIME);

    return () => clearInterval(timer);
  }, [changeCurrentPromo]);


  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promoProducts[currentPromo].previewImgWebp}, ${promoProducts[currentPromo].previewImgWebp2x} 2x`}/><img src={promoProducts[currentPromo].previewImg} srcSet={`${promoProducts[currentPromo].previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info"><span className="banner__message">Новинка!</span><span className="title title--h1">{promoProducts[currentPromo].name}</span><span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span><Link className="btn" to={`${AppRoute.Product}/${promoProducts[currentPromo].id}`}>Подробнее</Link></p>
    </div>
  );
}

export default Banner;
