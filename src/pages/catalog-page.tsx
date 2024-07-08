import { Helmet } from 'react-helmet-async';
import Cards from '../components/cards/cards';
import { Link } from 'react-router-dom';
import { AppRoute, PER_PAGE_CAMERAS_COUNT } from '../const';
import Banner from '../components/banner/banner';
import Sort from '../components/sort/sort';
import Filters from '../components/filters/filters';
import Pagination from '../components/pagination/pagination';
import { useAppSelector } from '../hooks';
import { selectFilteredCameras } from '../store/cameras-process/cameras-process.selectors';

function CatalogPage () {
  const filteredCameras = useAppSelector(selectFilteredCameras);
  return (
    <main>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Banner />
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
              <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
              </li>
            </ul>
          </div>
        </div>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <div className="catalog__aside">
                <img src="img/banner.png"/>
                <Filters />
              </div>
              <div className="catalog__content">
                <Sort />
                <Cards />
                {filteredCameras.length >= PER_PAGE_CAMERAS_COUNT ? <Pagination/> : ''}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default CatalogPage;
