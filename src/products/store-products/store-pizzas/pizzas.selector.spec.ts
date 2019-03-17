import { TestBed } from '@angular/core/testing';
import { combineReducers, select, Store, StoreModule } from '@ngrx/store';
import { appReducers } from '../../../app/store-app/app.reducer';
import { getRouterState } from '../../../app/store-app/store-router';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import { productsReducers, ProductsState } from '../products.reducer';
import { LoadToppingsSuccess, VisualizeToppings } from '../store-toppings';
import { LoadPizzasSuccess } from './pizzas.action';
import {
  getPizzasEntities,
  getPizzasState,
  getPizzaVisualized,
  getSelectedPizza,
} from './pizzas.selector';

describe('Pizzas Selectors', () => {
  let store: Store<ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];
  const pizza1: Pizza = {
    id: 1,
    name: 'Pizza 1',
    toppings,
  };
  const pizza2: Pizza = {
    id: 2,
    name: 'Pizza 2',
    toppings,
  };
  const pizza3: Pizza = {
    id: 3,
    name: 'Pizza 3',
    toppings,
  };
  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];
  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...appReducers,
          products: combineReducers(productsReducers),
        }),
      ],
    });
    store = TestBed.get(Store);
  });

  describe('getPizzaState', () => {
    it('should return state of pizza store slice', () => {
      let result;
      store.pipe(select(getPizzasState)).subscribe(value => {
        result = value;
      });

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(new LoadPizzasSuccess(pizzas));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });
  describe('getPizzaEntities', () => {
    it('should return pizzas as entities', () => {
      let result;

      store
        .pipe(select(getPizzasEntities))
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(new LoadPizzasSuccess(pizzas));

      expect(result).toEqual(entities);
    });
  });
  describe('getSelectedPizza', () => {
    it('should return selected pizza as an entity', () => {
      let result, params;

      store.dispatch(new LoadPizzasSuccess(pizzas));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: { pizzaId: '2' },
          },
          event: {},
        },
      });

      store.pipe(select(getRouterState)).subscribe(router => {
        params = router.state.params;
      });

      expect(params).toEqual({ pizzaId: '2' });

      store.pipe(select(getSelectedPizza)).subscribe(selectedPizza => {
        result = selectedPizza;
      });

      expect(result).toEqual(entities[2]);
    });
  });
  describe('getPizzaVisualized', () => {
    it('should return visualized pizza', () => {
      let result;
      const loadedToppings = [
        { id: 6, name: 'topping 1' },
        { id: 9, name: 'topping 2' },
        { id: 11, name: 'topping 3' },
      ];
      store.dispatch(new LoadPizzasSuccess(pizzas));
      store.dispatch(new LoadToppingsSuccess(loadedToppings));
      store.dispatch(new VisualizeToppings([11, 9, 6]));

      store.dispatch({
        type: 'ROUTER_NAVIGATION',
        payload: {
          routerState: {
            url: '/products',
            queryParams: {},
            params: { pizzaId: '2' },
          },
          event: {},
        },
      });

      store.pipe(select(getPizzaVisualized)).subscribe(pizza => {
        result = pizza;
      });

      expect(result).toEqual({
        ...entities[2],
        toppings: [loadedToppings[2], loadedToppings[1], loadedToppings[0]],
      });
    });
  });
});
