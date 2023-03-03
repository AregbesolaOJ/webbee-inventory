import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, GlobalStyles } from '../styles';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  label?: string;
  isFocused?: boolean;
  onPress?: () => void;
  icon: string;
}

export const CustomDrawerItem = ({
  label,
  isFocused,
  onPress,
  icon,
}: Props) => (
  <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
    <View
      style={[
        styles.container,
        { backgroundColor: isFocused ? '#E5E5E5' : '' },
      ]}
    >
      <FontAwesome5
        name={icon}
        color={isFocused ? Colors.primary : Colors.darkGrey}
        size={14}
      />
      <Text
        style={[
          GlobalStyles.text,
          {
            marginLeft: 20,
            color: isFocused ? Colors.primary : Colors.darkGrey,
            fontWeight: isFocused ? 'bold' : '500',
          },
        ]}
      >
        {label}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 4,
  },
});
