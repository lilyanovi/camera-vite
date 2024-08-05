import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, } from '../../const';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog-page';
import ProductPage from '../../pages/product-page';
import NotFoundPage from '../../pages/not-found-page';
import CartPage from '../../pages/cart-page';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route
            index
            element={<CatalogPage/>}
          />
          <Route path={AppRoute.Product}>
            <Route
              path=':id'
              element={<ProductPage/>}
            />
          </Route>
          <Route
            path={AppRoute.Cart}
            element={<CartPage/>}
          />
          <Route
            path='*'
            element={<NotFoundPage/>}
          />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
