import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import { Colors, Fonts, Helpers, Metrics } from '../styles';

type SwitchAttributeProps = {
  /**
   * Value for switch.
   */
  value?: boolean;
  /**
   * Callback called with the new value when it changes.
   */
  onValueChange?: (val: boolean) => void;
  title: string;
};
export const SwitchAttribute = ({
  title,
  onValueChange,
  value,
}: SwitchAttributeProps) => (
  <View
    style={[
      Helpers.rowCross,
      Helpers.mainSpaceBetween,
      { marginVertical: -10 },
    ]}
  >
    <Switch
      thumbColor={Colors.dark}
      color={Colors.primary}
      value={value}
      onValueChange={onValueChange}
    />
    <View style={[Helpers.fill, Metrics.horizontalMargin]}>
      <Text style={Fonts.caption3} numberOfLines={1}>
        {title || 'Lock'}
      </Text>
    </View>
  </View>
);
