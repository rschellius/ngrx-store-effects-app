import {
  LOAD_TOPPINGS,
  LOAD_TOPPINGS_FAIL,
  LOAD_TOPPINGS_SUCCESS,
  LoadToppings,
  LoadToppingsFail,
  LoadToppingsSuccess,
  VISUALIZE_TOPPINGS,
  VisualizeToppings,
} from './toppings.action';

describe('Toppings Actions', () => {
  describe('LoadToppings actions', () => {
    describe('LoadToppings', () => {
      it('should create an action', () => {
        const action = new LoadToppings();
        expect({ ...action }).toEqual({ type: LOAD_TOPPINGS });
      });
    });
    describe('LoadToppingsFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new LoadToppingsFail(payload);
        expect({ ...action }).toEqual({ type: LOAD_TOPPINGS_FAIL, payload });
      });
    });
    describe('LoadToppingsSuccess', () => {
      it('should create an action', () => {
        const payload = [];
        const action = new LoadToppingsSuccess(payload);
        expect({ ...action }).toEqual({ type: LOAD_TOPPINGS_SUCCESS, payload });
      });
    });
  });
  describe('VisualizeToppings actions', () => {
    describe('VisualizeToppings', () => {
      it('should create an action', () => {
        const payload = [1, 2, 3];
        const action = new VisualizeToppings(payload);
        expect({ ...action }).toEqual({ type: VISUALIZE_TOPPINGS, payload });
      });
    });
  });
});
