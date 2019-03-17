import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ProductsState } from '../store-products';
import {
  getPizzasEntities,
  getPizzasLoaded,
  LoadPizzas,
} from '../store-products/store-pizzas';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
  constructor(private store: Store<ProductsState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const id = route.params.pizzaId;
    return this.checkStore().pipe(switchMap(() => this.hasPizza(id)));
  }

  private hasPizza(id) {
    return this.store.pipe(
      select(getPizzasEntities),
      map(entities => {
        return !!entities[id];
      }),
      take(1),
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
