import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import { Category, IButtonProps } from '../interfaces';
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
  category: Category;
  handleUpdateCategory: ({
    catId,
    value,
    attr,
  }: {
    catId: string;
    value: string;
    attr: string;
  }) => void;
  handleDeleteCategory: ({ catId }: { catId: string }) => void;
  handleUpdateField: ({
    catId,
    fieldId,
    value,
    attr,
    initField,
    isNewType,
  }: {
    catId: string;
    fieldId: string;
    value: string;
    attr: string;
    initField?: boolean;
    isNewType?: boolean;
  }) => void;
  handleDeleteField: ({
    fieldId,
    catId,
  }: {
    fieldId: string;
    catId: string;
  }) => void;
  handleAddNewField: ({
    fieldType,
    catId,
  }: {
    catId: string;
    fieldType: string;
  }) => void;
};

export const CategoryConfig = ({
  category,
  handleUpdateCategory,
  handleDeleteCategory,
  handleUpdateField,
  handleDeleteField,
  handleAddNewField,
}: Props) => {
  const { categoryId, categoryName, fields, categoryTitleField } = category;
  const allFieldNames = fields
    .filter(({ attribute }) => String(attribute).length > 0)
    .map(({ attribute }) => attribute);

  return (
    <Card
      style={[
        styles.cardStyle,
        Metrics.smallHorizontalPadding,
        Metrics.smallVerticalPadding,
      ]}
    >
      <Text style={[GlobalStyles.title, Metrics.bottomMargin]}>
        {categoryName || 'Unnamed Field'}
      </Text>
      <View style={Metrics.smallVerticalMargin}>
        <TextField
          label='Category Name'
          value={categoryName}
          onChangeText={(val) =>
            handleUpdateCategory({
              catId: categoryId,
              value: val,
              attr: 'categoryName',
            })
          }
        />
      </View>
      {fields.map((field) => (
        <View
          style={[Metrics.smallVerticalMargin, Helpers.rowCross]}
          key={field.id}
        >
          <View style={Helpers.fill}>
            <TextField
              label='Attribute Field'
              accessibilityLabel='Attribute text field'
              value={field.attribute}
              onChangeText={(val) => {
                handleUpdateField({
                  value: val,
                  fieldId: field.id,
                  attr: 'attribute',
                  catId: categoryId,
                  initField: fields.length === 1,
                });
              }}
            />
          </View>

          <View style={Metrics.smallHorizontalMargin}>
            <MenuPopup
              anchor={AttributeTypePicker as React.ElementType}
              menuOptions={['checkbox', 'date', 'number', 'text']}
              attributeType={(field.attributeType || 'text') as string}
              onSelect={(val) =>
                handleUpdateField({
                  value: val,
                  fieldId: field.id,
                  attr: 'attributeType',
                  catId: categoryId,
                  isNewType: true,
                })
              }
            />
          </View>

          <Pressable
            onPress={() =>
              triggerDeleteAction(() =>
                handleDeleteField({ fieldId: field.id, catId: categoryId })
              )
            }
            style={Metrics.tinyHorizontalMargin}
          >
            <FontAwesome name='trash-o' color={Colors.primary} size={24} />
          </Pressable>
        </View>
      ))}
      <View style={Metrics.smallVerticalMargin}>
        <MenuPopup
          anchor={Button as React.ElementType}
          menuOptions={allFieldNames}
          attributeType={`Title Field: ${
            categoryTitleField || 'Unnamed field'
          }`}
          onSelect={(value: string) =>
            handleUpdateCategory({
              catId: categoryId,
              value,
              attr: 'categoryTitleField',
            })
          }
        />
      </View>
      <View style={[Metrics.smallVerticalMargin, Helpers.rowCross]}>
        <MenuPopup
          anchor={Button as React.ElementType}
          menuOptions={['checkbox', 'date', 'number', 'text']}
          attributeType='Add New Field'
          light
          onSelect={(value: string) =>
            handleAddNewField({ fieldType: value, catId: categoryId })
          }
        />
        <Pressable
          style={[
            Metrics.horizontalPadding,
            Metrics.horizontalMargin,
            Helpers.rowCenter,
          ]}
          onPress={() =>
            triggerDeleteAction(() =>
              handleDeleteCategory({ catId: categoryId })
            )
          }
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
