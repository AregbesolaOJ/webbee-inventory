import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { ScreenProps } from '../../navigations/types';
import { useAppSelector } from '../../reduxStore/hooks';
import { isIos } from '../../utils';
import {
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
  widthScale,
} from '../../styles';

import { IndividualCategory } from './category';
import { Category } from '../../interfaces';
import React from 'react';

type ExtraProps = {
  activeCategory?: Category;
};

const Dashboard = ({
  navigation,
  route,
  ...props
}: ScreenProps & ExtraProps): JSX.Element => {
  const storeCategories = useAppSelector((state) => state.categories);

  return (
    <KeyboardAvoidingView
      behavior={isIos() ? 'padding' : undefined}
      keyboardVerticalOffset={isIos() ? -5 : 0}
      enabled
      style={Helpers.fill}
    >
      <View style={GlobalStyles.container}>
        {!storeCategories?.length ? (
          <View style={Helpers.fillCenter}>
            <Text style={GlobalStyles.text}>No Categories created yet!</Text>
            <Button
              label='Create Category'
              onPress={() => navigation.navigate('ManageCategories')}
              buttonStyle={{
                maxWidth: widthScale(200),
                marginVertical: heightScale(15),
              }}
            />
          </View>
        ) : (
          <ScrollView
            style={[GlobalStyles.container, Helpers.fillCol]}
            showsVerticalScrollIndicator={false}
          >
            {storeCategories.map((category) => (
              <React.Fragment key={category.categoryId}>
                <IndividualCategory
                  navigation={navigation}
                  route={route}
                  activeCategory={category}
                />
                <View style={Metrics.mediumBottomMargin} />
              </React.Fragment>
            ))}
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
