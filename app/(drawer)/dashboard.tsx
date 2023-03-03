import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

const Dashboard = ({ navigation, ...props }: ScreenProps): JSX.Element => {
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
          <ScrollView contentContainerStyle={GlobalStyles.layout}>
            <Text style={GlobalStyles.title}>Dashboard Screen</Text>
          </ScrollView>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
