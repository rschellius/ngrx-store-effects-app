import { TestBed } from '@angular/core/testing';
import { combineReducers, select, Store, StoreModule } from '@ngrx/store';
import { Topping } from '../../models/topping.model';
import { productsReducers, ProductsState } from '../products.reducer';
import { LoadToppingsSuccess, VisualizeToppings } from './toppings.action';
import { getSelectedToppings, getToppingsEntities } from './toppings.selector';

describe('Toppings Selectors', () => {
  let store: Store<ProductsState>;
  const toppings: Topping[] = [
    { id: 1, name: 'bacon' },
    { id: 2, name: 'pepperoni' },
    { id: 3, name: 'tomato' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          products: combineReducers(productsReducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getToppingsEntities', () => {
    it('should return toppings as entities', () => {
      let result;
      store.pipe(select(getToppingsEntities)).subscribe(value => {
        result = value;
      });

      expect(result).toEqual({});

      store.dispatch(new LoadToppingsSuccess(toppings));

      expect(result).toEqual(entities);
    });
  });
  describe('getSelectedToppings', () => {
    it('should return selected toppings as ids', () => {
      let result;
      store.pipe(select(getSelectedToppings)).subscribe(value => {
        result = value;
      });

      store.dispatch(new LoadToppingsSuccess(toppings));

      expect(result).toEqual([]);

      store.dispatch(new VisualizeToppings([1, 3]));

      expect(result).toEqual([1, 3]);
    });
  });
});
