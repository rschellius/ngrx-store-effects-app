import { PizzaExistsGuard } from './pizza-exists.guard';
import { PizzasGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';

export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guard';

export const productsGuards: any[] = [
  PizzasGuard,
  PizzaExistsGuard,
  ToppingsGuard,
];
