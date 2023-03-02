/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces';
import type { RootState } from '../appStore';

type CategoriesState = Category[];

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as CategoriesState,
  reducers: {
    updateCategory: (state) => [...state],
  },
});

export const { updateCategory } = categoriesSlice.actions;

export const selectcategories = (state: RootState) => state.categories;

export default categoriesSlice.reducer;
