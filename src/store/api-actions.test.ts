import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeCamera, makeFakeId, makeFakeOrder, makeFakePromoProduct, makeFakeReview } from '../mocks';
import type { State } from '../types/state';
import { beforeEach } from 'vitest';
import { APIRoute } from '../const';
import { fetchCamerasListAction, fetchProductByIdAction, fetchPromoProductsListAction, fetchReviewsListAction, fetchSimilarProductsByIdAction, postOrderPhoneAction } from './api-actions';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      CAMERAS: {cameras: [], promoProducts: []},
      REVIEWS: {sortReviews: []}
    });
  });

  describe('fetchCamerasListAction', () => {

    it('should dispatch "fetchCamerasListAction.pending" and "fetchCamerasListAction.fulfilled" when server response 200', async() => {
      const mockCameras = [makeFakeCamera()];
      mockAxiosAdapter.onGet(APIRoute.Camera).reply(200, mockCameras);

      await store.dispatch(fetchCamerasListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCamerasListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchCamerasListAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchCamerasListAction.pending.type,
        fetchCamerasListAction.fulfilled.type
      ]);
      expect(fetchCamerasListActionFulfilled.payload).toEqual(mockCameras);
    });

    it('should dispatch "fetchCamerasListAction.pending" and "fetchCamerasListAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Camera).reply(400, []);

      await store.dispatch(fetchCamerasListAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCamerasListAction.pending.type,
        fetchCamerasListAction.rejected.type
      ]);
    });
  });

  describe('fetchPromoProductsListAction', () => {

    it('should dispatch "fetchPromoProductsListAction.pending" and "fetchPromoProductsListAction.fulfilled" when server response 200', async() => {
      const mockPromoProducts = [makeFakePromoProduct()];
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, mockPromoProducts);

      await store.dispatch(fetchPromoProductsListAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoProductsListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoProductsListAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        fetchPromoProductsListAction.pending.type,
        fetchPromoProductsListAction.fulfilled.type
      ]);
      expect(fetchPromoProductsListActionFulfilled.payload).toEqual(mockPromoProducts);
    });

    it('should dispatch "fetchPromoProductsListAction.pending" and "fetchPromoProductsListAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(400, []);

      await store.dispatch(fetchPromoProductsListAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoProductsListAction.pending.type,
        fetchPromoProductsListAction.rejected.type
      ]);
    });
  });

  describe('fetchReviewsListAction', () => {

    it('should dispatch "fetchReviewsListAction.pending" and "fetchReviewsListAction.fulfilled" when server response 200', async() => {
      const mockReviews = [makeFakeReview()];
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}/reviews`).reply(200, mockReviews);

      await store.dispatch(fetchReviewsListAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsListActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsListAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        fetchReviewsListAction.pending.type,
        fetchReviewsListAction.fulfilled.type
      ]);
      expect(fetchReviewsListActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsListAction.pending" and "fetchReviewsListAction.rejected" when server response 400', async() => {
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}/reviews`).reply(400, []);

      await store.dispatch(fetchReviewsListAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsListAction.pending.type,
        fetchReviewsListAction.rejected.type
      ]);
    });
  });

  describe('fetchProductByIdAction', () => {

    it('should dispatch "fetchProductByIdAction.pending" and "fetchProductByIdAction.fulfilled" when server response 200', async() => {
      const mockReview = makeFakeReview();
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}`).reply(200, mockReview);

      await store.dispatch(fetchProductByIdAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchProductByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchProductByIdAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        fetchProductByIdAction.pending.type,
        fetchProductByIdAction.fulfilled.type
      ]);
      expect(fetchProductByIdActionFulfilled.payload).toEqual(mockReview);
    });

    it('should dispatch "fetchProductByIdAction.pending" and "fetchProductByIdAction.rejected" when server response 400', async() => {
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}`).reply(400, {});

      await store.dispatch(fetchProductByIdAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchProductByIdAction.pending.type,
        fetchProductByIdAction.rejected.type
      ]);
    });
  });

  describe('fetchSimilarProductsByIdAction', () => {

    it('should dispatch "fetchSimilarProductsByIdAction.pending" and "fetchSimilarProductsByIdAction.fulfilled" when server response 200', async() => {
      const mockReviews = [makeFakeReview()];
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}/similar`).reply(200, mockReviews);

      await store.dispatch(fetchSimilarProductsByIdAction(mockId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarProductsByIdActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarProductsByIdAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        fetchSimilarProductsByIdAction.pending.type,
        fetchSimilarProductsByIdAction.fulfilled.type
      ]);
      expect(fetchSimilarProductsByIdActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchSimilarProductsByIdAction.pending" and "fetchSimilarProductsByIdAction.rejected" when server response 400', async() => {
      const mockId = makeFakeId();
      mockAxiosAdapter.onGet(`${APIRoute.Camera}/${mockId}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarProductsByIdAction(mockId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarProductsByIdAction.pending.type,
        fetchSimilarProductsByIdAction.rejected.type
      ]);
    });
  });

  describe('postOrderPhoneAction', () => {

    it('should dispatch "postOrderPhoneAction.pending" and "postOrderPhoneAction.fulfilled" when server response 201', async() => {
      const mockOrder = makeFakeOrder();
      mockAxiosAdapter.onPost(APIRoute.Order).reply(201);

      await store.dispatch(postOrderPhoneAction(mockOrder));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postOrderPhoneAction.pending.type,
        postOrderPhoneAction.fulfilled.type
      ]);
    });

    it('should dispatch "postOrderPhoneAction.pending" and "postOrderPhoneAction.rejected" when server response 400', async() => {
      const mockOrder = makeFakeOrder();
      mockAxiosAdapter.onPost(APIRoute.Order).reply(400);

      await store.dispatch(postOrderPhoneAction(mockOrder));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrderPhoneAction.pending.type,
        postOrderPhoneAction.rejected.type
      ]);
    });
  });

});
