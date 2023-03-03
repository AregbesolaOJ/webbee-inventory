/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../interfaces';

type CategoriesState = Category[];

type Machine = Pick<Category, 'machines'>['machines'][number];

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
    addMachineAction: (
      state,
      action: PayloadAction<{ machines: Machine[]; catId: string }>
    ) =>
      [...state].filter((category) =>
        category.categoryId === action.payload.catId
          ? {
              ...category,
              machines: action.payload.machines,
            }
          : category
      ),
    updateMachinesAction: (
      state,
      action: PayloadAction<{ machines: {}[]; catId: string }>
    ) =>
      [...state].filter((category) =>
        category.categoryId === action.payload.catId
          ? { ...category, machines: action.payload.machines }
          : category
      ),
  },
});

export const {
  updateCategoriesAction,
  addCategoryAction,
  addMachineAction,
  updateMachinesAction,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
