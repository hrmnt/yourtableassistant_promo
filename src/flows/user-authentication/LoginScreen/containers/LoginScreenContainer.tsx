import {connect, ConnectedProps} from 'react-redux';
import React, {
  FunctionComponent,
  useEffect,
  useCallback,
  useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {} from 'react-navigation';

import {getListOfShows} from 'src/actions/listActions';

import {LoginScreen} from '../components';
import {Alert} from 'react-native';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface LoginScreenContainerProps extends PropsFromRedux {
  onSignIn: () => void;
}

const LoginScreenContainer: FunctionComponent<LoginScreenContainerProps> = (
  props,
) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onSignIn = useCallback(
    (email: string, password: string) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
          props.onSignIn();
        })
        .catch(() => {
          Alert.alert('Wrong credentials');
        });
    },
    [props],
  );

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  if (!user) {
    return (
      <>
        <LoginScreen user={user} onSignIn={onSignIn} />
      </>
    );
  } else {
    props.onSignIn();
  }
  return null;
};
const mapStateToProps = (store: any) => ({
  films: store.list,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  getList: (page: number) => dispatch(getListOfShows(page)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LoginScreenContainer);
