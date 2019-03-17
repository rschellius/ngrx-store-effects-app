import {
  CREATE_PIZZA,
  CREATE_PIZZA_FAIL,
  CREATE_PIZZA_SUCCESS,
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  LOAD_PIZZAS,
  LOAD_PIZZAS_FAIL,
  LOAD_PIZZAS_SUCCESS,
  LoadPizzas,
  LoadPizzasFail,
  LoadPizzasSuccess,
  REMOVE_PIZZA,
  REMOVE_PIZZA_FAIL,
  REMOVE_PIZZA_SUCCESS,
  RemovePizza,
  RemovePizzaFail,
  RemovePizzaSuccess,
  UPDATE_PIZZA,
  UPDATE_PIZZA_FAIL,
  UPDATE_PIZZA_SUCCESS,
  UpdatePizza,
  UpdatePizzaFail,
  UpdatePizzaSuccess,
} from './pizzas.action';

describe('Pizzas Action', () => {
  describe('LoadPizzas actions', () => {
    describe('LoadPizzas', () => {
      it('should create an action', () => {
        const action = new LoadPizzas();
        expect({ ...action }).toEqual({ type: LOAD_PIZZAS });
      });
    });
    describe('LoadPizzasFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new LoadPizzasFail(payload);
        expect({ ...action }).toEqual({ type: LOAD_PIZZAS_FAIL, payload });
      });
    });
    describe('LoadPizzasSuccess', () => {
      it('should create an action', () => {
        const payload = [];
        const action = new LoadPizzasSuccess(payload);
        expect({ ...action }).toEqual({ type: LOAD_PIZZAS_SUCCESS, payload });
      });
    });
  });
  describe('CreatePizza actions', () => {
    describe('CreatePizza', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CreatePizza(payload);
        expect({ ...action }).toEqual({ type: CREATE_PIZZA, payload });
      });
    });
    describe('CreatePizzaFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CreatePizzaFail(payload);
        expect({ ...action }).toEqual({ type: CREATE_PIZZA_FAIL, payload });
      });
    });
    describe('CreatePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new CreatePizzaSuccess(payload);
        expect({ ...action }).toEqual({ type: CREATE_PIZZA_SUCCESS, payload });
      });
    });
  });
  describe('UpdatePizza actions', () => {
    describe('UpdatePizza', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new UpdatePizza(payload);
        expect({ ...action }).toEqual({ type: UPDATE_PIZZA, payload });
      });
    });
    describe('UpdatePizzaFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new UpdatePizzaFail(payload);
        expect({ ...action }).toEqual({ type: UPDATE_PIZZA_FAIL, payload });
      });
    });
    describe('UpdatePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new UpdatePizzaSuccess(payload);
        expect({ ...action }).toEqual({ type: UPDATE_PIZZA_SUCCESS, payload });
      });
    });
  });
  describe('RemovePizza actions', () => {
    describe('RemovePizza', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new RemovePizza(payload);
        expect({ ...action }).toEqual({ type: REMOVE_PIZZA, payload });
      });
    });
    describe('RemovePizzaFail', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new RemovePizzaFail(payload);
        expect({ ...action }).toEqual({ type: REMOVE_PIZZA_FAIL, payload });
      });
    });
    describe('RemovePizzaSuccess', () => {
      it('should create an action', () => {
        const payload = {};
        const action = new RemovePizzaSuccess(payload);
        expect({ ...action }).toEqual({ type: REMOVE_PIZZA_SUCCESS, payload });
      });
    });
  });
});
