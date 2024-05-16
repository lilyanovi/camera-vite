import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { AppRoute } from '../const';
import Rating from '../components/rating/rating';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCurrentProduct } from '../store/product-process/product-process.selectors';
import { useEffect } from 'react';
import { fetchProductByIdAction, fetchReviewsListAction } from '../store/api-actions';
import Tabs from '../components/tabs/tabs';
import Reviews from '../components/reviews/reviews';

function ProductPage () {

  const {id} = useParams();

  const currentProduct = useAppSelector(selectCurrentProduct);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if(isMounted) {
      if((!currentProduct && id) || (id && currentProduct && Number(id) !== currentProduct?.id)) {
        dispatch(fetchProductByIdAction(id));
        dispatch(fetchReviewsListAction(id));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id, currentProduct]);

  if(currentProduct){
    const {name, vendorCode, level, category, description, type, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, rating, reviewCount} = currentProduct;

    return (
      <>
        <main>
          <Helmet>
            <title>{name} - Фотошоп</title>
          </Helmet>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item">
                    <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </Link>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/><img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="560" height="480" alt={name}/>
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{name}</h1>
                    <div className="rate product__rate">
                      <Rating rating={rating}/>
                      <p className="visually-hidden">Рейтинг: {rating}</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <Tabs
                      vendorCode={vendorCode}
                      category={category}
                      type={type}
                      level={level}
                      description={description}
                    />
                  </div>
                </div>
              </section>
            </div>
            <div className="page-content__section">
              <Reviews />
            </div>
          </div>
        </main>
        <a className="up-btn" href="#header">
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </a>
      </>
    );
  }
}

export default ProductPage;
