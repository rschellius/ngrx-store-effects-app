import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ProductsState } from '../store-products';
import {
  getToppingsLoaded,
  LoadToppings,
} from '../store-products/store-toppings';

@Injectable()
export class ToppingsGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate() {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }

  private checkStore() {
    return this.store.pipe(
      select(getToppingsLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadToppings());
        }
      }),
      filter(loaded => loaded),
      take(1),
    );
  }
}
