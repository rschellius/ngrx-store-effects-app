import { ActionReducerMap } from '@ngrx/store';
import { pizzasReducer, PizzaState } from './store-pizzas';
import { toppingsReducer, ToppingsState } from './store-toppings';

export interface ProductsState {
  pizzas: PizzaState;
  toppings: ToppingsState;
}

export const productsReducers: ActionReducerMap<ProductsState> = {
  pizzas: pizzasReducer,
  toppings: toppingsReducer,
};
