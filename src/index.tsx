import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { store } from './store';
import { fetchCamerasListAction, fetchPromoProductsListAction } from './store/api-actions';
import './mocks';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';
import 'react-toastify/ReactToastify.css';

store.dispatch(fetchCamerasListAction());
store.dispatch(fetchPromoProductsListAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
