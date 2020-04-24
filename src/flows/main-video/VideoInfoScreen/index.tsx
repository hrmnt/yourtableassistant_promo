import React, {useCallback} from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {VideoScreenContainer} from './containers';

interface VideoScreenProps {}

const VideoInfoScreen: NavigationScreenComponent<VideoScreenProps> = (
  props,
) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <VideoScreenContainer
      onBack={handleBackButton}
      id={props.navigation.getParam('id')}
    />
  );
};

VideoInfoScreen.navigationOptions = (screenProps) => ({
  title: 'Hello',
});

export default VideoInfoScreen;
