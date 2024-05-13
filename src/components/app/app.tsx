import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import CatalogPage from '../../pages/catalog-page';

function App(): JSX.Element {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout/>}>
            <Route
              index
              element={<CatalogPage/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
