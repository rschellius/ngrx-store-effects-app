import { Pizza } from '../../models/pizza.model';
import { LoadPizzas, LoadPizzasSuccess } from './pizzas.action';
import { initialState, pizzasReducer } from './pizzas.reducer';

describe('PizzasReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = pizzasReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('LOAD_PIZZAS action', () => {
    it('should set loading to true', () => {
      const action = new LoadPizzas();
      const state = pizzasReducer(initialState, action);

      expect(state.loading).toEqual(true);
    });
  });
  describe('LOAD_PIZZAS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] },
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
      };
      const action = new LoadPizzasSuccess(pizzas);
      const state = pizzasReducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });
});
