import { MouseEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectSimilarProducts } from '../../store/product-process/product-process.selectors';
import CardItem from '../cards/card-item';
import { getIsActiveProducts } from '../../utils';

function ProductSimilar (): JSX.Element {

  const similarProducts = useAppSelector(selectSimilarProducts);
  const [isActiveProducts, setIsActiveProducts] = useState<number[]>([]);

  useEffect(() => {
    if(similarProducts.length > 0){
      setIsActiveProducts(getIsActiveProducts(similarProducts));
    }
  }, [similarProducts]);

  const handleShowNextProducts = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsActiveProducts(getIsActiveProducts(similarProducts, isActiveProducts));
  };

  const handleShowPrevProducts = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const isPrev = true;
    setIsActiveProducts(getIsActiveProducts(similarProducts, isActiveProducts, isPrev));
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title&#45;&#45;h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarProducts.map((product) => <CardItem key={product.id} camera={product} isActive={isActiveProducts.includes(product.id)}/>)}
            </div>
            <button
              className="slider-controls slider-controls&#45;&#45;prev"
              type="button"
              aria-label="Предыдущий слайд"
              onClick={handleShowPrevProducts}
              disabled={isActiveProducts.at(0) === similarProducts.at(0)?.id}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              className="slider-controls slider-controls&#45;&#45;next"
              type="button"
              aria-label="Следующий слайд"
              onClick={handleShowNextProducts}
              disabled={isActiveProducts.at(-1) === similarProducts.at(-1)?.id}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilar;
