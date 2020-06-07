import React from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {AppControlContainer} from './containers';

interface TypeListProps {}

const AppControlScreen: NavigationScreenComponent<TypeListProps> = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  const toLoginScreen = () => {
    props.navigation.navigate('LoginScreenList');
  };

  const toAppScreen = () => {
    props.navigation.navigate('MainMenu');
  };

  return (
    <AppControlContainer
      onBack={handleBackButton}
      toLoginScreen={toLoginScreen}
      toAppScreen={toAppScreen}
    />
  );
};

export default AppControlScreen;
