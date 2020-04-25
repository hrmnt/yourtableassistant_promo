import {createStackNavigator} from 'react-navigation';

import VideoScreenList from './VideoScreenList';
import VideoInfoScreen from './VideoInfoScreen';

const mainVideoFlow = createStackNavigator(
  {
    VideoScreenList: {
      screen: VideoScreenList,
    },
    VideoInfoScreen: {
      screen: VideoInfoScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

export {mainVideoFlow};
