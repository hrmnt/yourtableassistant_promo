import {createStackNavigator} from 'react-navigation';

import VideoScreenList from './VideoScreenList';
import VideoInfoScreen from './VideoInfoScreen';
import BucketScreen from './BucketScreen';
import OptionsList from '../main-orders/OptionsListScreen';

const mainVideoFlow = createStackNavigator(
  {
    Orders: {
      screen: OptionsList,
    },
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
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Orders',
  },
);

export {mainVideoFlow};
