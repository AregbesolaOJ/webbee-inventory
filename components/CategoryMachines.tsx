import { FontAwesome } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import {
  StyleSheet,
  Pressable,
  DatePickerIOSComponent,
  Text,
  View,
} from 'react-native';
import { Card } from 'react-native-paper';
import { Category, IButtonProps, MachineType } from '../interfaces';
import {
  Colors,
  Fonts,
  GlobalStyles,
  Helpers,
  Metrics,
  moderateScale,
} from '../styles';
import { triggerDeleteAction } from '../utils';
import { SwitchAttribute } from './SwitchAttribute';
import { TextField } from './TextField';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

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
  const { id, ...rest } = machine;

  const fields = Object.entries(rest);
  const machineTitle = useMemo(
    () =>
      machine[titleField.toLowerCase().split(' ').join('_')]?.attributeValue ||
      'Unnamed Field',
    [machine]
  );

  const renderFormFieldType = (value: any, key: string) => {
    if (['text', 'number'].includes(value.attributeType)) {
      return (
        <TextField
          label={value.attribute || ''}
          keyboardType={
            value.attributeType === 'number' ? 'numeric' : 'default'
          }
          defaultValue={value.attributeValue || ''}
          onChangeText={(val) => {
            handleUpdateMachine({
              id,
              value: val,
              attr: key,
            });
          }}
        />
      );
    }
    if (value.attributeType === 'checkbox') {
      return (
        <SwitchAttribute
          title={value.attribute || ''}
          value={value.attributeValue || false}
          onValueChange={(val) => {
            handleUpdateMachine({
              id,
              value: val,
              attr: key,
            });
          }}
        />
      );
    }
    return (
      <DateTimePicker
        onChange={(evt: DateTimePickerEvent, date: Date | undefined) => {
          handleUpdateMachine({
            id,
            value: date ? new Date(date) : null,
            attr: key,
          });
        }}
        style={{ width: '100%', marginRight: 'auto' }}
        value={value.attributeValue || new Date()}
        maximumDate={new Date(2030, 10, 20)}
        minimumDate={new Date(1950, 0, 1)}
      />
    );
  };

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
            {renderFormFieldType(value, key)}
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
