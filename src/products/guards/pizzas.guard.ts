import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { ProductsState } from '../store-products';
import { getPizzasLoaded, LoadPizzas } from '../store-products/store-pizzas';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(error => of(false)),
    );
  }

  private checkStore() {
    return this.store.pipe(
      select(getPizzasLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new LoadPizzas());
        }
      }),
      filter(loaded => loaded),
      take(1),
    );
  }
}
