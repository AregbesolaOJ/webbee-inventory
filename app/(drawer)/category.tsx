import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { ScreenProps } from '../../navigations/types';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { isIos, uuid } from '../../utils';
import {
  Fonts,
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
} from '../../styles';
import { CategoryMachines, CategoryHeader } from '../../components';
import { updateCategoriesAction } from '../../reduxStore';
import { Category as CategoryType, MachineType } from '../../interfaces';

type ExtraProps = {
  activeCategory?: CategoryType;
};

export const IndividualCategory = ({
  route,
  navigation,
  activeCategory,
  ...props
}: ScreenProps & ExtraProps): JSX.Element => {
  const params = route?.params;
  const storeCategories = useAppSelector((state) => state.categories);

  const currentCategory = useMemo(() => {
    return activeCategory !== undefined
      ? activeCategory
      : storeCategories.find(
          (category) => category.categoryId === params?.categoryId
        );
  }, [storeCategories, activeCategory, params]);

  const scrollViewRef = useRef<ScrollView>(null);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const triggerAddNewMachine = useCallback(() => {
    const newMachine: MachineType = {
      id: uuid(),
    };
    currentCategory?.fields
      .filter((field) => String(field.attribute).length > 0)
      .forEach((field) => {
        const key = field.attribute.toLowerCase().split(' ').join('_');
        newMachine[key] = {
          attribute: field.attribute,
          attributeType: field.attributeType,
          attributeValue: '',
        };
        return field;
      });
    const updatedCategories = [...storeCategories].map((category) =>
      category.categoryId === currentCategory?.categoryId
        ? {
            ...category,
            machines: [...(currentCategory?.machines || []), newMachine],
          }
        : category
    );
    dispatch(updateCategoriesAction(updatedCategories));
  }, [dispatch, currentCategory]);

  const handleUpdateMachine = useCallback(
    ({ id, value, attr }: { id: string; value: string; attr: string }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === currentCategory?.categoryId
          ? {
              ...category,
              machines: currentCategory?.machines?.filter((mach) =>
                mach.id !== id
                  ? {
                      ...mach,
                      [attr]: {
                        ...mach[attr],
                        attributeValue: value,
                      },
                    }
                  : mach
              ),
            }
          : category
      );

      dispatch(updateCategoriesAction(updatedCategories));
    },
    [currentCategory, dispatch, storeCategories]
  );

  const handleDeleteMachine = useCallback(
    ({ id }: { id: string }) => {
      const updatedCategories = [...storeCategories].map((category) =>
        category.categoryId === currentCategory?.categoryId
          ? {
              ...category,
              machines: currentCategory?.machines?.filter(
                (mach) => mach.id !== id
              ),
            }
          : category
      );
      dispatch(updateCategoriesAction(updatedCategories));
    },
    [currentCategory]
  );

  return (
    <>
      <View style={GlobalStyles.layoutSection}>
        <CategoryHeader
          categoryName={`${currentCategory?.categoryName}`}
          onPress={triggerAddNewMachine}
        />
      </View>

      {!currentCategory?.machines?.length ? (
        <View style={Helpers.fillCenter}>
          <Text style={[Fonts.caption4, GlobalStyles.italic]}>
            No Machines found for this Category!
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            { flexGrow: 1, paddingTop: heightScale(10), columnGap: 15 },
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
          {currentCategory?.machines.map((machine) => (
            <View
              key={machine.id}
              style={[
                currentCategory?.machines.at(-1)?.id === machine.id
                  ? Metrics.mediumBottomMargin
                  : Metrics.bottomMargin,
                {
                  width: SCREEN_WIDTH > 720 ? '48%' : '100%',
                },
              ]}
            >
              <CategoryMachines
                machine={machine}
                titleField={currentCategory?.categoryTitleField}
                handleUpdateMachine={handleUpdateMachine}
                handleDeleteMachine={handleDeleteMachine}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

const Category = ({ route, navigation }: ScreenProps): JSX.Element => {
  const params = route?.params;
  const storeCategories = useAppSelector((state) => state.categories);

  useEffect(() => {
    const routeCategory = storeCategories.find(
      (store) => store.categoryId === params?.categoryId
    );
    navigation.setOptions({
      headerRight: () => null,
      headerTitle: routeCategory?.categoryName || 'Category',
      headerTitleAlign: 'center',
    });
  }, [route]);

  return (
    <KeyboardAvoidingView
      behavior={isIos() ? 'padding' : undefined}
      keyboardVerticalOffset={isIos() ? -5 : 0}
      enabled
      style={Helpers.fill}
    >
      <View style={[GlobalStyles.container, Helpers.fillCol]}>
        <IndividualCategory navigation={navigation} route={route} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Category;
