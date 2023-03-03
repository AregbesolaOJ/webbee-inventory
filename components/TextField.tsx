import { useState } from 'react';
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
  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <View style={styles.container}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        editable={disabled}
        placeholder='Type something'
        underlineColorAndroid='transparent'
        placeholderTextColor={Colors.lightGrey}
        style={[
          Fonts.caption3,
          styles.field,
          inputStyle,
          focused && styles.focusedStyle,
        ]}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
    lineHeight: 18,
  },
  container: {
    width: '100%',
    position: 'relative',
  },
  labelStyle: {
    position: 'absolute',
    paddingVertical: 2.5,
    borderRadius: 12,
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
    zIndex: 10,
    top: -10,
    left: 10,
    // borderWidth: 1,
    // borderColor: Colors.danger,
    color: Colors.dark,
    fontSize: FontSize.extra_small,
    marginBottom: heightScale(2.5),
  },
  focusedStyle: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
});
