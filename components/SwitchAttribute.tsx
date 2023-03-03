import React from 'react';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-paper';
import { Colors, Fonts, Helpers, Metrics } from '../styles';

export const SwitchAttribute = ({ title }: { title: string }) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={[Helpers.rowCross, Helpers.mainSpaceBetween]}>
      <Switch
        thumbColor={Colors.dark}
        color={Colors.primary}
        value={isSwitchOn}
        onValueChange={onToggleSwitch}
      />
      <View style={[Helpers.fill, Metrics.horizontalMargin]}>
        <Text style={Fonts.caption3} numberOfLines={1}>
          {title || 'Lock'}
        </Text>
      </View>
    </View>
  );
};
