import React, {useCallback} from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {LoginScreenContainer} from './containers';

interface LoginScreenProps {}

const LoginScreen: NavigationScreenComponent<LoginScreenProps> = (props) => {
  const handleSignIn = useCallback(() => {
    props.navigation.navigate('MainMenu');
  }, [props.navigation]);

  return <LoginScreenContainer onSignIn={handleSignIn} />;
};

export default LoginScreen;
