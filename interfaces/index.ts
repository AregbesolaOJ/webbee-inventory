import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export type Category = {
  id: number;
  firstname: string;
  lastname: string;
  role: string;
  telephone: string;
  email: string;
  email_verified: string;
  [key: string]: unknown | object;
};

export interface IButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
}
export interface ITextFieldProps extends TextInputProps {
  disabled?: boolean;
  label: string;
  inputStyle?: StyleProp<ViewStyle>;
}
