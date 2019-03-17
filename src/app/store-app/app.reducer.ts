import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { RouterStateUrl } from './store-router';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
