import React from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {TypeListContainer} from './containers';

interface TypeListProps {}

const VideoInfoScreen: NavigationScreenComponent<TypeListProps> = (props) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <TypeListContainer
      onBack={handleBackButton}
      id={props.navigation.getParam('id')}
    />
  );
};

export default VideoInfoScreen;
