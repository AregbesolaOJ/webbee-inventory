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
  buttonStyle,
}: IButtonProps) => {
  return (
    <Pressable
      style={[
        styles.button,
        Metrics.horizontalPadding,
        Helpers.center,
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: heightScale(45),
    width: '100%',
    backgroundColor: Colors.primary,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});
