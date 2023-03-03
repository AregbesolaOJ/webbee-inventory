import { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Button } from '../../components/Button';
import { ScreenProps } from '../../navigations/types';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { isIos, machineCategory, uuid } from '../../utils';
import {
  Fonts,
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
} from '../../styles';
import { CategoryConfig } from '../../components';
import { addCategoryAction, updateCategoriesAction } from '../../reduxStore';

const ManageCategories = ({ navigation }: ScreenProps): JSX.Element => {
  const storeCategories = useAppSelector((state) => state.categories);

  const scrollViewRef = useRef<ScrollView>(null);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const triggerAddNewCategory = useCallback(() => {
    const newCategory = {
      ...machineCategory,
    };
    newCategory.categoryId = uuid();
    newCategory.fields[0].id = uuid();
    newCategory.fields[0].attributeType = 'text';
    dispatch(addCategoryAction(newCategory));
  }, [dispatch, machineCategory]);

  const handleUpdateCategory = useCallback(
    ({
      catId,
      value,
      attr,
    }: {
      catId: string;
      value: string;
      attr: string;
    }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === catId
          ? { ...category, [attr]: value }
          : category
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [storeCategories]
  );

  const handleDeleteCategory = useCallback(
    ({ catId }: { catId: string }) => {
      const updatedCategories = [...storeCategories].filter(
        (category) => category.categoryId !== catId
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [storeCategories]
  );

  const handleAddNewField = useCallback(
    ({ catId, fieldType }: { catId: string; fieldType: string }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === catId
          ? {
              ...category,
              fields: [
                ...category.fields,
                {
                  id: uuid(),
                  attribute: '',
                  attributeType: fieldType,
                  attributeValue: undefined,
                },
              ],
            }
          : category
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [storeCategories]
  );

  const handleUpdateField = useCallback(
    ({
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
    }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === catId
          ? {
              ...category,
              categoryTitleField: initField
                ? value
                : category.categoryTitleField,
              fields: [...category.fields].map((field) =>
                field.id === fieldId
                  ? {
                      ...field,
                      [attr]: value,
                      attributeValue: isNewType
                        ? undefined
                        : field.attributeValue,
                    }
                  : field
              ),
            }
          : category
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [storeCategories]
  );

  const handleDeleteField = useCallback(
    ({ catId, fieldId }: { catId: string; fieldId: string }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === catId
          ? {
              ...category,
              fields: [...category.fields].filter(
                (field) => field.id !== fieldId
              ),
            }
          : category
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [storeCategories]
  );

  return (
    <KeyboardAvoidingView
      behavior={isIos() ? 'padding' : undefined}
      keyboardVerticalOffset={isIos() ? -5 : 0}
      enabled
      style={Helpers.fill}
    >
      <View style={[GlobalStyles.container, Helpers.fillCol]}>
        {!storeCategories?.length ? (
          <View style={Helpers.fillCenter}>
            <Text style={[Fonts.caption4, GlobalStyles.italic]}>
              No Categories found!
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[
              { flexGrow: 1, paddingTop: heightScale(25), columnGap: 15 },
              GlobalStyles.layoutSection,
              Helpers.rowCross,
              Helpers.mainSpaceBetween,
              Helpers.wrap,
            ]}
            style={Helpers.fill}
            ref={scrollViewRef}
            onContentSizeChange={() => {
              scrollViewRef.current?.scrollToEnd();
            }}
            showsVerticalScrollIndicator={false}
          >
            {storeCategories.map((category, index) => (
              <View
                key={category.categoryId}
                style={[
                  storeCategories.at(-1)?.categoryId === category.categoryId
                    ? Metrics.mediumBottomMargin
                    : Metrics.bottomMargin,
                  {
                    width: SCREEN_WIDTH > 720 ? '48%' : '100%',
                  },
                ]}
              >
                <CategoryConfig
                  category={category}
                  handleUpdateCategory={handleUpdateCategory}
                  handleDeleteCategory={handleDeleteCategory}
                  handleAddNewField={handleAddNewField}
                  handleUpdateField={handleUpdateField}
                  handleDeleteField={handleDeleteField}
                />
              </View>
            ))}
          </ScrollView>
        )}

        <View style={GlobalStyles.layoutSection}>
          <Button
            label='Add New Category'
            onPress={triggerAddNewCategory}
            buttonStyle={{
              marginTop: heightScale(15),
              marginBottom: heightScale(25),
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManageCategories;
