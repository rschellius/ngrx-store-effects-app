import { createFeatureSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const getProductsState = createFeatureSelector<ProductsState>(
  'products',
);
