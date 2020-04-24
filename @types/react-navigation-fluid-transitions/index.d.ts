declare module 'react-navigation-fluid-transitions' {
  import {Animated, ScaledSize, ViewStyle} from 'react-native';
  import {
    NavigationRouteConfigMap,
    NavigationTransitionSpec,
    StackNavigatorConfig,
    NavigationContainer,
  } from 'react-navigation';
  import React from 'react';

  type TransitionType =
    | 'scale'
    | 'bottom'
    | 'top'
    | 'left'
    | 'right'
    | 'horizontal'
    | 'vertical'
    | 'flip';

  interface Metrics {
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
  }

  interface TransitionInfo {
    progress: Animated.Value;
    metrics: Metrics;
    boundingbox: Metrics;
    name: string;
    start: number;
    route: string;
    end: number;
    dimensions: ScaledSize;
  }

  type TransitionFn = (transitionInfo: TransitionInfo) => ViewStyle;

  const FluidNavigator: (
    routeConfigMap: NavigationRouteConfigMap,
    stackConfig?: Pick<
      StackNavigatorConfig,
      Exclude<keyof StackNavigatorConfig, 'transitionConfig'>
    > & {
      transitionConfig: NavigationTransitionSpec;
    },
  ) => NavigationContainer;

  interface TransitionProps {
    appear?: TransitionType | TransitionFn;
    disappear?: TransitionType | TransitionFn;
    anchor?: string;
    delay?: boolean;
    animated?: string;
    shared?: string;
    zIndex?: number;
    inline?: boolean;
    // NOTE: added with a patch
    disabled?: boolean;
  }

  class Transition extends React.Component<TransitionProps> {}

  export {
    TransitionType,
    Metrics,
    TransitionInfo,
    TransitionFn,
    FluidNavigator,
    TransitionProps,
    Transition,
  };
}
