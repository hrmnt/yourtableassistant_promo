import React from 'react';
import {Animated} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import {allFlows} from '../flows';
import {Res} from 'src/resources';

const RootNavigationContainer = createAppContainer(
  createStackNavigator(
    {
      MainTabs: {
        screen: createBottomTabNavigator(
          {
            ...allFlows,
          },
          {
            initialRouteName: '0',
            tabBarOptions: {
              activeTintColor: Res.colors.secondary,
              inactiveTintColor: Res.colors.neutral400,
            },
          },
        ),
        path: '',
      },
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
