import {createStackNavigator} from 'react-navigation';

import VideoScreenList from './VideoScreenList';
import VideoInfoScreen from './VideoInfoScreen';
import BucketScreen from './BucketScreen';

const mainVideoFlow = createStackNavigator(
  {
    VideoScreenList: {
      screen: VideoScreenList,
    },
    VideoInfoScreen: {
      screen: VideoInfoScreen,
    },
    BucketScreen: {
      screen: BucketScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

export {mainVideoFlow};
