import { StyleSheet, Text, View, TextInput } from 'react-native';
import { ITextFieldProps } from '../interfaces';
import {
  Colors,
  Fonts,
  FontSize,
  heightScale,
  Helpers,
  widthScale,
} from '../styles';

export const TextField = ({
  disabled,
  inputStyle,
  label = 'Outlined input',
  ...props
}: ITextFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        editable={disabled}
        placeholder='Type something'
        placeholderTextColor={Colors.lightGrey}
        style={[styles.field, Fonts.caption3, inputStyle]}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 8,
    height: heightScale(45),
    overflow: 'hidden',
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(109, 109, 109, .25)',
    paddingLeft: widthScale(10),
  },
  container: {
    width: '100%',
  },
  labelStyle: {
    color: Colors.dark,
    fontSize: FontSize.small,
    marginBottom: heightScale(7.5),
  },
});
