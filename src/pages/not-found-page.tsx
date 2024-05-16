import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import { Helmet } from 'react-helmet-async';

function NotFoundPage () {
  return (
    <main>
      <Helmet>
        <title>Фотошоп: страница не найдена</title>
      </Helmet>
      <div className="page-content">
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">404 Not Found</h1>
            <Link className="breadcrumbs__link" to={AppRoute.Main}>Go to home page</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFoundPage;
