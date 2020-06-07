import {createStackNavigator} from 'react-navigation';

import LoginScreenList from './LoginScreen';
import AppControlScreen from '../app-control';

const authorizationFlow = createStackNavigator(
  {
    AppControl: {
      screen: AppControlScreen,
    },
    LoginScreenList: {
      screen: LoginScreenList,
    },
  },
  {
    headerMode: 'none',
  },
);

export {authorizationFlow};
