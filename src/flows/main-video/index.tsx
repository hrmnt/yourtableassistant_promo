import {createStackNavigator} from 'react-navigation';

import VideoScreenList from './VideoScreenList';
import TableScreenList from './TableScreenList';
import VideoInfoScreen from './VideoInfoScreen';
import BucketScreen from './BucketScreen';
import OptionsList from '../main-orders/OptionsListScreen';
import OrderHistoryScreen from './OrderHistory';

const mainVideoFlow = createStackNavigator(
  {
    Orders: {
      screen: OptionsList,
    },
    VideoScreenList: {
      screen: VideoScreenList,
    },
    TableScreenList: {
      screen: TableScreenList,
    },
    VideoInfoScreen: {
      screen: VideoInfoScreen,
    },
    BucketScreen: {
      screen: BucketScreen,
    },
    OrderHistory: {
      screen: OrderHistoryScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Orders',
  },
);

export {mainVideoFlow};
