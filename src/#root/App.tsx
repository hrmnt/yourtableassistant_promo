import React from 'react';
import {Provider} from 'react-redux';

import store from 'src/redux/store';

import {AppNavigator} from './AppNavigator';

interface AppProps {}

export class App extends React.PureComponent<AppProps> {
  public render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
