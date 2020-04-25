import {createStackNavigator} from 'react-navigation';

import LoginScreenList from './LoginScreen';

const authorizationFlow = createStackNavigator(
  {
    LoginScreenList: {
      screen: LoginScreenList,
    },
  },
  {
    headerMode: 'none',
  },
);

export {authorizationFlow};
