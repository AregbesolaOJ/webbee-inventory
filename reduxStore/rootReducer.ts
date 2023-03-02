import { combineReducers, AnyAction } from '@reduxjs/toolkit';

import { categoriesSlice } from './slices/categoriesSlice';

const rootReducer = combineReducers({
  [categoriesSlice.name]: categoriesSlice.reducer,
});

export default (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction
) => rootReducer(state, action);
