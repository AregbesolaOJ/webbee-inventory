import { PropsWithChildren } from 'react';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import { categoryAttributesTypes, machineCategory } from '../utils';

export type Category = {
  categoryId: string;
  categoryName: string;
  fields: {
    id: string;
    attribute: string;
    attributeType: string;
    attributeValue: string;
  }[];
  machines: MachineType[];
  categoryTitleField: string;
};
export interface IButtonProps extends PropsWithChildren {
  label: string;
  attributeType?: string;
  light?: boolean;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
}
export interface ITextFieldProps extends TextInputProps {
  disabled?: boolean;
  label: string;
  inputStyle?: StyleProp<ViewStyle>;
}

export type MenuOption = typeof categoryAttributesTypes[number];

export interface MenuPopupProps {
  onSelect: (val: MenuOption | string) => void;
  menuOptions: MenuOption[] | string[];
  attributeType: string;
  light?: boolean;
  anchor: React.ElementType;
}

export type MachineType = {
  id: string;
  [x: string]:
    | {
        attributeValue: string | Date | boolean | undefined;
        attributeType: string;
        attribute: string;
      }
    | string;
};
