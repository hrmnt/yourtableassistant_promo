import {createStackNavigator} from 'react-navigation';

import OptionsList from './OptionsListScreen';

const mainOrdersFlow = createStackNavigator(
  {
    OptionsList: {
      screen: OptionsList,
    },
  },
  {
    headerMode: 'none',
  },
);

export {mainOrdersFlow};
