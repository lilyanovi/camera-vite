import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, StatusLoading } from '../../const';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog-page';
import ProductPage from '../../pages/product-page';
import NotFoundPage from '../../pages/not-found-page';
import { useAppSelector } from '../../hooks';
import { selectStatusLoading } from '../../store/cameras-process/cameras-process.selectors';
import Loader from '../loader/loader';

function App(): JSX.Element {
  const statusLoading = useAppSelector(selectStatusLoading);

  if(statusLoading === StatusLoading.Loading) {
    return (
      <Loader />
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
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
              path='*'
              element={<NotFoundPage/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
