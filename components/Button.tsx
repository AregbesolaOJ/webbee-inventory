import { StyleSheet, Pressable, Text } from 'react-native';
import { IButtonProps } from '../interfaces';
import {
  Colors,
  heightScale,
  Helpers,
  Metrics,
  moderateScale,
} from '../styles';

export const Button = ({
  label,
  onPress,
  disabled,
  light,
  attributeType,
  buttonStyle,
  children,
}: IButtonProps) => {
  const buttonColor = light ? { color: Colors.primary } : { color: '#fff' };
  const bgColor = light
    ? {
        backgroundColor: Colors.white,
        borderColor: Colors.primary,
        borderWidth: 1,
      }
    : { backgroundColor: Colors.primary };
  return (
    <Pressable
      style={[
        styles.button,
        Metrics.horizontalPadding,
        Helpers.center,
        bgColor,
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {children ? (
        <>{children}</>
      ) : (
        <Text style={[styles.buttonLabel, buttonColor]}>
          {label || attributeType}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: heightScale(45),
    width: '100%',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
