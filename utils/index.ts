import { Platform } from 'react-native';

export const isIos = () => Platform.OS === 'ios';

export const getCurrentRouteKey = (
  history: { type: string }[],
  index: number
) => {
  const routes = history.filter((route) => route.type === 'drawer');
  const key = routes.length ? routes[routes.length - 1] : {};
  return key;
};
