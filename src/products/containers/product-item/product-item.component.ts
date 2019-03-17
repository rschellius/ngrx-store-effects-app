import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Pizza } from '../../models/pizza.model';

import { Topping } from '../../models/topping.model';
import { ProductsState } from '../../store-products';
import {
  CreatePizza,
  getPizzaVisualized,
  getSelectedPizza,
  RemovePizza,
  UpdatePizza,
} from '../../store-products/store-pizzas';
import {
  getAllToppings,
  VisualizeToppings,
} from '../../store-products/store-toppings';

@Component({
  selector: 'app-product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(private store: Store<ProductsState>) {}

  ngOnInit() {
    this.pizza$ = this.store.pipe(
      select(getSelectedPizza),
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists
          ? pizza.toppings.map(topping => topping.id)
          : [];
        this.store.dispatch(new VisualizeToppings(toppings));
      }),
    );
    this.visualise$ = this.store.pipe(select(getPizzaVisualized));
    this.toppings$ = this.store.pipe(select(getAllToppings));
  }

  onSelect(event: number[]) {
    this.store.dispatch(new VisualizeToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new RemovePizza(event));
    }
  }
}
