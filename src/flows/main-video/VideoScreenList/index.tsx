import React, {useCallback} from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {VideoScreenContainer} from './containers';

interface VideoScreenProps {}

const VideoScreen: NavigationScreenComponent<VideoScreenProps> = (props) => {
  const handleShowMovie = useCallback(
    (id: string) => {
      props.navigation.navigate('VideoInfoScreen', {id});
    },
    [props.navigation],
  );

  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <VideoScreenContainer
      handleBackButton={handleBackButton}
      onShowPress={handleShowMovie}
    />
  );
};

export default VideoScreen;
