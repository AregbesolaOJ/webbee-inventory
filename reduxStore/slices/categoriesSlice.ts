/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces';

type CategoriesState = Category[];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as CategoriesState,
  reducers: {
    addCategoryAction: (state, action: PayloadAction<Category>) => [
      ...state,
      action.payload,
    ],
    updateCategoriesAction: (state, action: PayloadAction<Category[]>) => [
      ...action.payload,
    ],
  },
});

export const { updateCategoriesAction, addCategoryAction } = categoriesSlice.actions;

export default categoriesSlice.reducer;
