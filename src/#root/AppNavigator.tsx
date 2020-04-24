import React from 'react';
import {Animated} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import {allFlows} from '../flows';

const RootNavigationContainer = createAppContainer(
  createStackNavigator(
    {
      ...allFlows,
    },
    {
      mode: 'modal',
      headerMode: 'none',
      transparentCard: true,
      cardStyle: {
        backgroundColor: 'transparent',
        opacity: 1,
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 0,
          timing: Animated.timing,
        },
      }),
      navigationOptions: {
        gesturesEnabled: false,
      },
    },
  ),
);

interface AppNavigatorProps {}

export const AppNavigator: React.FunctionComponent<AppNavigatorProps> = () => {
  return <RootNavigationContainer />;
};
