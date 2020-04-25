import {Platform} from 'react-native';
import {
  human,
  material,
  systemWeights,
  iOSUIKit,
} from 'react-native-typography';

import {Measurements} from 'src/utils/measurements';

import {colors} from './colors';

export const textStyles = {
  // semantic
  section1Title: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    ...systemWeights.semibold,
    textTransform: 'uppercase' as const,
  },
  section2Title: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    ...systemWeights.semibold,
    color: colors.neutral600,
  },
  appBarNormalTitle: {
    ...Platform.select({
      ios: human.headlineObject,
      android: material.titleObject,
    }),
    color: 'rgba(0, 0, 0, .9)',
  },
  appBarNormalTitleWhite: {
    ...Platform.select({
      ios: human.headlineObject,
      android: material.titleObject,
    }),
    color: colors.white,
  },
  appBarProminentTitle: {
    ...Platform.select({
      ios: iOSUIKit.largeTitleEmphasizedObject,
      android: material.display2Object,
    }),
    ...systemWeights.bold,
    color: colors.neutral900,
  },
  appBarProminentWhite: {
    ...Platform.select({
      ios: iOSUIKit.largeTitleEmphasizedObject,
      android: material.display2Object,
    }),
    ...systemWeights.bold,
    lineHeight: Platform.select({
      ios: 28,
      // TODO: find out correct value
      android: 45,
    }),
    color: colors.white,
  },
  carNumberInput: {
    fontFamily: 'Motor4F',
    // eslint-disable-next-line no-magic-numbers
    fontSize: Measurements.screenWidth <= 640 ? 54 : 62,
    color: colors.neutral900,
  },
  carNumberSmallInput: {
    fontFamily: 'Motor4F',
    // eslint-disable-next-line no-magic-numbers
    fontSize: Measurements.screenWidth <= 640 ? 40 : 48,
    color: colors.neutral900,
  },
  shortCodeInput: {
    ...Platform.select({
      ios: iOSUIKit.largeTitleEmphasizedObject,
      android: material.display2Object,
    }),
    ...systemWeights.bold,
    color: colors.neutral900,
  },

  // non-semantic
  title1: {
    ...Platform.select({
      ios: {
        ...human.title1Object,
        ...systemWeights.bold,
      },
      android: material.display1Object,
    }),
    color: colors.neutral900,
  },
  title1White: {
    ...Platform.select({
      ios: {
        ...human.title1Object,
        ...systemWeights.bold,
      },
      android: material.display1Object,
    }),
    color: colors.white,
  },
  title2: {
    ...Platform.select({
      ios: {
        ...human.title2Object,
        ...systemWeights.semibold,
      },
      android: material.headlineObject,
    }),
    color: colors.neutral900,
  },
  title2White: {
    ...Platform.select({
      ios: {
        ...human.title2Object,
        ...systemWeights.semibold,
      },
      android: material.headlineObject,
    }),
    color: colors.white,
  },
  title3: {
    ...Platform.select({
      ios: {
        ...human.title3Object,
        ...systemWeights.semibold,
      },
      android: material.titleObject,
    }),
    color: colors.neutral900,
  },
  title3White: {
    ...Platform.select({
      ios: {
        ...human.title3Object,
        ...systemWeights.semibold,
      },
      android: material.titleObject,
    }),
    color: colors.white,
  },
  body1Emphasized: {
    ...human.bodyObject,
    ...systemWeights.semibold,
    color: colors.neutral900,
  },
  body1EmphasizedWhite: {
    ...human.bodyObject,
    ...systemWeights.semibold,
    color: colors.white,
  },
  body1: {
    ...human.bodyObject,
    color: colors.neutral900,
  },
  body1White: {
    ...human.bodyObject,
    color: colors.white,
  },
  body2Emphasized: {
    ...material.body1Object,
    ...systemWeights.semibold,
    color: colors.neutral900,
  },
  body2EmphasizedWhite: {
    ...material.body1Object,
    ...systemWeights.semibold,
    color: colors.white,
  },
  body2: {
    ...material.body1Object,
    color: colors.neutral900,
  },
  body2White: {
    ...material.body1Object,
    color: colors.white,
  },
  captionEmphasized: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    ...systemWeights.semibold,
    color: colors.neutral900,
  },
  captionEmphasizedWhite: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    ...systemWeights.semibold,
    color: colors.white,
  },
  caption: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    color: colors.neutral900,
  },
  captionWhite: {
    ...Platform.select({
      ios: human.caption1Object,
      android: material.captionObject,
    }),
    color: colors.white,
  },
};
