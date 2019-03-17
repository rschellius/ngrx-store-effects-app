import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Navigate } from '../../../app/store-app/store-router';
import { PizzasService } from '../../services';
import {
  CREATE_PIZZA,
  CREATE_PIZZA_SUCCESS,
  CreatePizza,
  CreatePizzaFail,
  CreatePizzaSuccess,
  LOAD_PIZZAS,
  LoadPizzasFail,
  LoadPizzasSuccess,
  REMOVE_PIZZA,
  REMOVE_PIZZA_SUCCESS,
  RemovePizza,
  RemovePizzaFail,
  RemovePizzaSuccess,
  UPDATE_PIZZA,
  UPDATE_PIZZA_SUCCESS,
  UpdatePizza,
  UpdatePizzaFail,
  UpdatePizzaSuccess,
} from './pizzas.action';

@Injectable()
export class PizzasEffect {
  constructor(
    private actions$: Actions,
    private pizzasService: PizzasService,
  ) {}

  @Effect()
  loadPizzas$ = this.actions$.pipe(
    ofType(LOAD_PIZZAS),
    switchMap(() => {
      return this.pizzasService
        .getPizzas()
        .pipe(
          map(pizzas => new LoadPizzasSuccess(pizzas)),
          catchError(error => of(new LoadPizzasFail(error))),
        );
    }),
  );

  @Effect()
  createPizza$ = this.actions$.pipe(
    ofType(CREATE_PIZZA),
    map((action: CreatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzasService
        .createPizza(pizza)
        .pipe(
          map(createdPizza => new CreatePizzaSuccess(createdPizza)),
          catchError(error => of(new CreatePizzaFail(error))),
        );
    }),
  );

  @Effect()
  createPizzaSuccess$ = this.actions$.pipe(
    ofType(CREATE_PIZZA_SUCCESS),
    map((action: CreatePizzaSuccess) => action.payload),
    map(pizza => new Navigate({ path: ['/products', pizza.id] })),
  );

  @Effect()
  updatePizza$ = this.actions$.pipe(
    ofType(UPDATE_PIZZA),
    map((action: UpdatePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzasService
        .updatePizza(pizza)
        .pipe(
          map(updatedPizza => new UpdatePizzaSuccess(updatedPizza)),
          catchError(error => of(new UpdatePizzaFail(error))),
        );
    }),
  );

  @Effect()
  removePizza$ = this.actions$.pipe(
    ofType(REMOVE_PIZZA),
    map((action: RemovePizza) => action.payload),
    switchMap(pizza => {
      return this.pizzasService
        .removePizza(pizza)
        .pipe(
          map(() => new RemovePizzaSuccess(pizza)),
          catchError(error => of(new RemovePizzaFail(error))),
        );
    }),
  );

  @Effect()
  handlePizzaSuccess$ = this.actions$.pipe(
    ofType(UPDATE_PIZZA_SUCCESS, REMOVE_PIZZA_SUCCESS),
    map(() => new Navigate({ path: ['/products'] })),
  );
}
