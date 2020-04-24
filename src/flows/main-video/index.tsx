import VideoScreenList from './VideoScreenList';
import VideoInfoScreen from './VideoInfoScreen';
import {FluidNavigator} from 'react-navigation-fluid-transitions';

const mainVideoFlow = FluidNavigator({
  VideoScreenList: {
    screen: VideoScreenList,
  },
  VideoInfoScreen: {
    screen: VideoInfoScreen,
  },
});

export {mainVideoFlow};
