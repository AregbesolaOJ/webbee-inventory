import type { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type ScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type ScreenRouteProps = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;

export type RootStackParamList = {
  Profile: undefined;
  Dashboard: undefined;
  About: undefined;
  Category: { categoryId: string };
  NotFound: undefined;
  ManageCategories: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
