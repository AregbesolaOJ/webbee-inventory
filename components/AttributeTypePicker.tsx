import { Component } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { MenuPopupProps } from '../interfaces';
import {
  Colors,
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
  moderateScale,
} from '../styles';

export const AttributeTypePicker = ({
  attributeType,
  onPress,
}: {
  attributeType: string;
  onPress: () => void;
}) => (
  <Pressable style={[styles.cardStyle]} onPress={onPress}>
    <Text style={GlobalStyles.uppercase}>{attributeType || 'Text'}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 0,
    padding: 12,
    backgroundColor: Colors.white,
    height: heightScale(45),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(109, 109, 109, .25)',
  },
});
