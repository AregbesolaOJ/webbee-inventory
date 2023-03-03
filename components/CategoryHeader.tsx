import { StyleSheet, Pressable, Text, View } from 'react-native';
import {
  Colors,
  Fonts,
  GlobalStyles,
  heightScale,
  Helpers,
  Metrics,
  widthScale,
} from '../styles';
import { Button } from './Button';

type Props = {
  categoryName: string | undefined;
  onPress: () => void;
};

export const CategoryHeader = ({ categoryName, onPress }: Props) => {
  return (
    <View
      style={[styles.headerStyle, Helpers.rowCross, Helpers.mainSpaceBetween]}
    >
      <Text style={[GlobalStyles.title, Fonts.header3]}>
        {categoryName || 'Unnamed Field'}
      </Text>
      <Button
        label='Add New'
        onPress={onPress}
        buttonStyle={{
          maxWidth: widthScale(95),
          height: heightScale(35),
          marginLeft: 10,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomColor: 'rgba(109, 109, 109, .15)',
    borderBottomWidth: 1,
    paddingVertical: heightScale(7.5),
  },
});
