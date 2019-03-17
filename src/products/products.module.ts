import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// components
import * as fromComponents from './components';
// containers
import * as fromContainers from './containers';
import {
  PizzaExistsGuard,
  PizzasGuard,
  productsGuards,
  ToppingsGuard,
} from './guards';
// services
import * as fromServices from './services';
import { productsEffects, productsReducers } from './store-products';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [PizzasGuard],
    component: fromContainers.ProductsComponent,
  },
  {
    path: 'new',
    canActivate: [PizzasGuard, ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
  {
    path: ':pizzaId',
    canActivate: [PizzaExistsGuard, ToppingsGuard],
    component: fromContainers.ProductItemComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('products', productsReducers),
    EffectsModule.forFeature(productsEffects),
  ],
  providers: [...fromServices.services, ...productsGuards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
