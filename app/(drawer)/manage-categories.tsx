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
import { Fonts, GlobalStyles, heightScale, Helpers } from '../../styles';
import { FontAwesome } from '@expo/vector-icons';

const ManageCategories = ({ navigation }: ScreenProps): JSX.Element => {
  const storeCategories = useAppSelector((state) => state.categories);

  return (
    <KeyboardAvoidingView
      behavior={isIos() ? 'padding' : undefined}
      keyboardVerticalOffset={isIos() ? -5 : 0}
      enabled
      style={Helpers.fill}
    >
      <View
        style={[
          GlobalStyles.container,
          GlobalStyles.layoutSection,
          Helpers.fillCol,
        ]}
      >
        {!storeCategories?.length ? (
          <View style={Helpers.fillCenter}>
            <Text style={[Fonts.caption4, GlobalStyles.italic]}>
              No Categories found!
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={[
              { flexGrow: 1, paddingTop: heightScale(25) },
            ]}
            style={Helpers.fill}
            showsVerticalScrollIndicator={false}
          >
            <Text style={GlobalStyles.title}>Manage Categories Screen</Text>
          </ScrollView>
        )}
        <Button
          label='Add New Category'
          onPress={() => navigation.navigate('ManageCategories')}
          buttonStyle={{
            marginVertical: heightScale(25),
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ManageCategories;
