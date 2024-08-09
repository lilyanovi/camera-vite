import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AppRoute, StatusLoading } from '../const';
import Rating from '../components/rating/rating';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectCurrentProduct, selectSimilarProducts, selectStatusLoading } from '../store/product-process/product-process.selectors';
import { useEffect, useState } from 'react';
import { fetchProductByIdAction, fetchReviewsListAction, fetchSimilarProductsByIdAction } from '../store/api-actions';
import Tabs from '../components/tabs/tabs';
import Reviews from '../components/reviews/reviews';
import Arrow from '../components/arrow/arrow';
import ProductSimilar from '../components/product-similar/product-similar';
import CartModal from '../components/modal/cart-modal';
import SuccessMessageModal from '../components/modal/success-message-modal';
import Modal from '../components/modal/modal';

function ProductPage () {
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);

  const handleButtonClick = () => {
    setIsModalActive(!isModalActive);
  };

  const handleSuccessModalChange = () => {
    setIsSuccessModalActive(!isSuccessModalActive);
  };

  const {id} = useParams();

  const currentProduct = useAppSelector(selectCurrentProduct);
  const statusLoading = useAppSelector(selectStatusLoading);
  const similarProducts = useAppSelector(selectSimilarProducts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;
    if(isMounted) {
      if((!currentProduct && id) || (id && currentProduct && Number(id) !== currentProduct?.id)) {
        dispatch(fetchProductByIdAction(id));
        dispatch(fetchReviewsListAction(id));
        dispatch(fetchSimilarProductsByIdAction(id));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id, currentProduct]);

  if(statusLoading !== StatusLoading.Loading && !currentProduct) {
    return <Navigate to='404'/>;
  }

  if(currentProduct){
    const {name, vendorCode, level, category, description, type, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, rating, reviewCount} = currentProduct;

    return (
      <>
        <main>
          <Helmet>
            <title>{name} - Фотошоп</title>
          </Helmet>
          <div className="page-content" data-testid="product-page-container">
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
                    <button className="btn btn--purple" type="button" onClick={handleButtonClick}>
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
            {similarProducts.length !== 0 ? <ProductSimilar /> : ''}
            <div className="page-content__section">
              <Reviews id={currentProduct.id}/>
            </div>
          </div>
        </main>
        <Arrow />
        {isModalActive ?
          <Modal
            content={<CartModal camera={currentProduct} handleButtonClick={handleButtonClick} handleSuccessModalChange={handleSuccessModalChange}/>}
            handleButtonClick={handleButtonClick}
          /> : ''}
        {isSuccessModalActive ?
          <Modal
            content={<SuccessMessageModal handleButtonClick={handleSuccessModalChange} isProduct/>}
            handleButtonClick={handleSuccessModalChange}
          /> : ''}
      </>
    );
  }
}

export default ProductPage;
