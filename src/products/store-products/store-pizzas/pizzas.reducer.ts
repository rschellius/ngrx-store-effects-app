import { Pizza } from '../../models/pizza.model';
import {
  CREATE_PIZZA_SUCCESS,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  PizzasAction,
  REMOVE_PIZZA_SUCCESS,
  UPDATE_PIZZA_SUCCESS,
} from './pizzas.action';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export function pizzasReducer(
  state = initialState,
  action: PizzasAction,
): PizzaState {
  switch (action.type) {
    case LOAD_PIZZAS: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case LOAD_PIZZAS_SUCCESS: {
      const entities = action.payload.reduce(
        (acc: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...acc,
            [pizza.id]: pizza,
          };
        },
        { ...state.entities },
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true,
      };
    }

    case CREATE_PIZZA_SUCCESS:
    case UPDATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza,
      };
      return {
        ...state,
        entities,
      };
    }

    case REMOVE_PIZZA_SUCCESS: {
      const {
        [action.payload.id]: _removedPizza,
        ...entities
      } = state.entities;
      return {
        ...state,
        entities,
      };
    }

    default: {
      return state;
    }
  }
}
