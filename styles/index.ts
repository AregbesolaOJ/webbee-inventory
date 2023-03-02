import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const widthScale = (size: number) => (width / guidelineBaseWidth) * size;
export const heightScale = (size: number) =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (widthScale(size) - size) * factor;

export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  white: '#ffffff',
  black: '#000000',
  primary: 'firebrick',
  dark: '#343A40',
  darkGrey: '#7C7C7C',
  lightGrey: '#979797',

  success: '#30BA87',
  warning: '#FFC107',
  danger: '#BD2130',
};

export const FontSize = {
  h1: moderateScale(30),
  h2: moderateScale(26),
  h3: moderateScale(24),
  title: moderateScale(20),
  medium: moderateScale(18),
  regular: moderateScale(16),
  small: moderateScale(15),
  extra_small: moderateScale(12),
};

export const Fonts = StyleSheet.create({
  header1: {
    fontSize: FontSize.h1,
    lineHeight: 42,
  },
  header2: {
    fontSize: FontSize.h2,
    lineHeight: 38,
  },
  header3: {
    fontSize: FontSize.h3,
    lineHeight: 34,
  },
  header4: {
    fontSize: FontSize.h3,
    lineHeight: 29,
  },
  subheading1: {
    fontSize: FontSize.title,
    lineHeight: 27,
  },
  subheading2: {
    fontSize: FontSize.title,
    lineHeight: 26,
  },
  caption1: {
    fontSize: FontSize.regular,
    lineHeight: 25,
  },
  caption2: {
    fontSize: FontSize.medium,
    lineHeight: 23,
  },
  caption3: {
    fontSize: FontSize.small,
    lineHeight: 21,
  },
  caption4: {
    fontSize: FontSize.extra_small,
    lineHeight: 18,
  },
});

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  pagePaddingX: {
    paddingLeft: widthScale(25),
    paddingRight: widthScale(25),
  },
  layout: {
    paddingLeft: widthScale(0),
    paddingRight: widthScale(0),
  },
  layoutSection: {
    paddingLeft: widthScale(16),
    paddingRight: widthScale(16),
  },
  pagePaddingLeft: {
    paddingLeft: widthScale(25),
  },
  autoCentered: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  italic: {
    fontStyle: 'italic',
  },
  title: {
    fontSize: FontSize.h3,
    fontWeight: '600',
    color: Colors.darkGrey,
  },
  text: {
    fontSize: FontSize.medium,
    color: Colors.dark,
  },
});

const tiny = 5;
const small = tiny * 2; // 10
const normal = tiny * 3; // 15
const medium = normal * 2; // 30

export const Metrics = {
  topMargin: {
    marginTop: heightScale(normal),
  },
  mediumTopMargin: {
    marginTop: heightScale(medium),
  },
  bottomMargin: {
    marginBottom: heightScale(normal),
  },
  mediumBottomMargin: {
    marginBottom: heightScale(medium),
  },

  topPadding: {
    paddingTop: heightScale(normal),
  },
  mediumTopPadding: {
    paddingTop: heightScale(medium),
  },
  bottomPadding: {
    paddingBottom: heightScale(normal),
  },
  mediumBottomPadding: {
    paddingBottom: heightScale(medium),
  },

  leftMargin: {
    marginLeft: widthScale(normal),
  },
  mediumLeftMargin: {
    marginLeft: widthScale(medium),
  },
  rightMargin: {
    marginRight: widthScale(normal),
  },
  mediumRightMargin: {
    marginRight: widthScale(medium),
  },

  leftPadding: {
    paddingLeft: widthScale(normal),
  },
  mediumLeftPadding: {
    paddingLeft: widthScale(medium),
  },
  rightPadding: {
    paddingRight: widthScale(normal),
  },
  mediumRightPadding: {
    paddingRight: widthScale(medium),
  },

  tinyVerticalMargin: {
    marginVertical: heightScale(tiny),
  },
  smallVerticalMargin: {
    marginVertical: heightScale(small),
  },
  verticalMargin: {
    marginVertical: heightScale(normal),
  },
  mediumVerticalMargin: {
    marginVertical: heightScale(medium),
  },

  tinyHorizontalMargin: {
    marginHorizontal: widthScale(tiny),
  },
  smallHorizontalMargin: {
    marginHorizontal: widthScale(small),
  },
  horizontalMargin: {
    marginHorizontal: widthScale(normal),
  },
  mediumHorizontalMargin: {
    marginHorizontal: widthScale(medium),
  },

  tinyHorizontalPadding: {
    paddingHorizontal: widthScale(tiny),
  },
  smallHorizontalPadding: {
    paddingHorizontal: widthScale(small),
  },
  horizontalPadding: {
    paddingHorizontal: widthScale(normal),
  },
  mediumHorizontalPadding: {
    paddingHorizontal: widthScale(medium),
  },

  tinyVerticalPadding: {
    paddingVertical: heightScale(tiny),
  },
  smallVerticalPadding: {
    paddingVertical: heightScale(small),
  },
  verticalPadding: {
    paddingVertical: heightScale(normal),
  },
  mediumVerticalPadding: {
    paddingVertical: heightScale(medium),
  },
};
