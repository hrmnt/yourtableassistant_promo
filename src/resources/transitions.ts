import {TransitionFn} from 'react-navigation-fluid-transitions';

interface TransitionMap {
  appear: TransitionFn;
  disappear: TransitionFn;
}

const fadeTransition: TransitionMap = {
  appear: (transitionInfo) => ({
    opacity: transitionInfo.progress.interpolate({
      inputRange: [0, transitionInfo.start, transitionInfo.end, 1],
      outputRange: [0, 0, 1, 1],
    }) as any,
  }),
  disappear: (transitionInfo) => ({
    opacity: transitionInfo.progress.interpolate({
      inputRange: [0, transitionInfo.start, transitionInfo.end, 1],
      outputRange: [1, 1, 0, 0],
    }) as any,
  }),
};

export const transitions = {
  fade: fadeTransition,
};
