import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux';
import type {AppDispatch, RootState} from './appStore';

// these two hooks would be called anytime we need to use `useSelector` & `useDispatch` respectively
// because they've been properly typed to access the store & dispatch any required actions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
