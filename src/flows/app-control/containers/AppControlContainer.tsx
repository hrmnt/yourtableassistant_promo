import React, {FunctionComponent, useEffect} from 'react';
import {AppControl} from '../component';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AppControlContainerProps {
  toLoginScreen: () => void;
  toAppScreen: () => void;
}

const AppControlContainer: FunctionComponent<AppControlContainerProps> = (
  props,
) => {
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      console.log(user?.uid);
      props.toAppScreen();
    } else {
      props.toLoginScreen();
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <AppControl />;
};

export default AppControlContainer;
