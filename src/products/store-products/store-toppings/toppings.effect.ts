import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToppingsService } from '../../services';
import {
  LOAD_TOPPINGS,
  LoadToppingsFail,
  LoadToppingsSuccess,
} from './toppings.action';

@Injectable()
export class ToppingsEffect {
  constructor(
    private actions$: Actions,
    private toppingsService: ToppingsService,
  ) {}

  @Effect()
  loadToppings$ = this.actions$.pipe(
    ofType(LOAD_TOPPINGS),
    switchMap(() => {
      return this.toppingsService
        .getToppings()
        .pipe(
          map(toppings => new LoadToppingsSuccess(toppings)),
          catchError(error => of(new LoadToppingsFail(error))),
        );
    }),
  );
}
