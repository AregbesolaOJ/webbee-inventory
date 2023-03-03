import { FontAwesome } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Category, IButtonProps, MachineType } from '../interfaces';
import {
  Colors,
  Fonts,
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
  moderateScale,
} from '../styles';
import { triggerDeleteAction } from '../utils';
import { AttributeTypePicker } from './AttributeTypePicker';
import { Button } from './Button';
import { MenuPopup } from './MenuPopup';
import { TextField } from './TextField';

type Props = {
  machine: MachineType;
  titleField: string;
  handleUpdateMachine: ({
    id,
    value,
    attr,
  }: {
    id: string;
    value: string;
    attr: string;
  }) => void;
  handleDeleteMachine: ({ id }: { id: string }) => void;
};

export const CategoryMachines = ({
  machine,
  titleField,
  handleUpdateMachine,
  handleDeleteMachine,
}: Props) => {
  const [title, setTitle] = useState('');
  const { id, ...rest } = machine;

  const fields = Object.entries(rest);
  const machineTitle = useMemo(
    () =>
      machine[titleField.toLowerCase().split(' ').join('_')]?.attributeValue ||
      'Unnamed Field',
    [machine]
  );

  return (
    <Card
      style={[
        styles.cardStyle,
        Metrics.smallHorizontalPadding,
        Metrics.smallVerticalPadding,
      ]}
    >
      <Text style={[GlobalStyles.title, Metrics.bottomMargin]}>
        {machineTitle}
      </Text>
      {fields.map(([key, value]) => {
        return (
          <View style={[Metrics.smallVerticalMargin]} key={key}>
            <TextField
              label={value.attribute || ''}
              defaultValue={value.attributeValue || ''}
              onChangeText={(val) => {
                handleUpdateMachine({
                  id,
                  value: val,
                  attr: key,
                });
              }}
            />
          </View>
        );
      })}
      <View style={[Metrics.smallVerticalMargin]}>
        <Pressable
          style={[
            Metrics.tinyHorizontalPadding,
            Helpers.rowCross,
            {
              width: '50%',
            },
          ]}
          onPress={() => triggerDeleteAction(() => handleDeleteMachine({ id }))}
        >
          <FontAwesome name='trash-o' color={Colors.primary} size={20} />
          <Text style={[Fonts.caption3, Metrics.tinyHorizontalMargin]}>
            Remove
          </Text>
        </Pressable>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 4,
    width: '100%',
    backgroundColor: Colors.white,
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
