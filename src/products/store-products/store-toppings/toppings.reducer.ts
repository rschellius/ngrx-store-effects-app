import { Topping } from '../../models/topping.model';
import {
  LOAD_TOPPINGS,
  LOAD_TOPPINGS_FAIL,
  LOAD_TOPPINGS_SUCCESS,
  ToppingsAction,
  VISUALIZE_TOPPINGS,
} from './toppings.action';

export interface ToppingsState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export function toppingsReducer(
  state = initialState,
  action: ToppingsAction,
): ToppingsState {
  switch (action.type) {
    case LOAD_TOPPINGS: {
      return {
        ...state,
        loading: true,
      };
    }

    case LOAD_TOPPINGS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case LOAD_TOPPINGS_SUCCESS: {
      const entities = action.payload.reduce(
        (acc: { [id: number]: Topping }, topping: Topping) => {
          return {
            ...acc,
            [topping.id]: topping,
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

    case VISUALIZE_TOPPINGS: {
      return {
        ...state,
        selectedToppings: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
