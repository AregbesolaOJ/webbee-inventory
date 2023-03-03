import { Alert, Platform } from 'react-native';

export const isIos = () => Platform.OS === 'ios';

export const getCurrentRouteKey = (
  history: { type: string }[],
  index: number
) => {
  const routes = history.filter((route) => route.type === 'drawer');
  const key = routes.length ? routes[routes.length - 1] : {};
  return key;
};

export const categoryAttributesTypes = [
  'date',
  'text',
  'checkbox',
  'number',
] as const;

export const machineCategory = {
  categoryId: '',
  categoryName: '',
  fields: [{ id: '', attribute: '', attributeType: '', attributeValue: '' }],
  machines: [
    {
      id: '',
      // title: '',  to rely on the value of 'categoryTitleField' from the parent otherwise 'unnamed field'
      //   ...attribute: { name: '', type: '' } => fields.forEach
    },
  ],
  categoryTitleField: '', // to be pulled from fields otherwise 'unnamed field'
};

export const triggerDeleteAction = (
  callback: (a?: unknown, b?: unknown) => void
) =>
  Alert.alert(
    'Delete Action',
    'Are you sure you want to remove this item? 😩 Action is irreversible!',
    [
      { text: 'Proceed!', onPress: callback },
      {
        text: 'No!',
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );

export const uuid = () =>
  (Math.random() * Date.now()).toString(16).substring(2);
