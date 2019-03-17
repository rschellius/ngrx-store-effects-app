import { createSelector } from '@ngrx/store';
import { getProductsState } from '../products.selector';

export const getToppingsState = createSelector(
  getProductsState,
  state => state.toppings,
);
export const getToppingsEntities = createSelector(getToppingsState, state => {
  return state.entities;
});
export const getAllToppings = createSelector(getToppingsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getToppingsLoaded = createSelector(
  getToppingsState,
  state => state.loaded,
);
export const getToppingsLoading = createSelector(
  getToppingsState,
  state => state.loading,
);
export const getSelectedToppings = createSelector(
  getToppingsState,
  state => state.selectedToppings,
);
