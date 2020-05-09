import React from 'react';
import {NavigationScreenComponent} from 'react-navigation';
import {NavigationActions, StackActions} from 'react-navigation';

import {BucketScreenContainer} from './containers';

interface BucketScreenProps {}

const BucketScreen: NavigationScreenComponent<BucketScreenProps> = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  const handleMainScreen = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'MainMenu'})],
    });
    props.navigation.dispatch(resetAction);
  };

  return (
    <BucketScreenContainer
      onBack={handleBackButton}
      onMainScreen={handleMainScreen}
      id={props.navigation.getParam('id')}
    />
  );
};

export default BucketScreen;
