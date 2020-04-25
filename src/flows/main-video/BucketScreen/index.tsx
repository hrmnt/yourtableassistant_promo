import React from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {BucketScreenContainer} from './containers';

interface BucketScreenProps {}

const BucketScreen: NavigationScreenComponent<BucketScreenProps> = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <BucketScreenContainer
      onBack={handleBackButton}
      id={props.navigation.getParam('id')}
    />
  );
};

export default BucketScreen;
