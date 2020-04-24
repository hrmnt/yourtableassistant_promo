import React, {useCallback} from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {VideoScreenContainer} from './containers';

interface VideoScreenProps {}

const VideoScreen: NavigationScreenComponent<VideoScreenProps> = (props) => {
  const handleShowMovie = useCallback(
    (id: number) => {
      props.navigation.navigate('VideoInfoScreen', {id});
    },
    [props.navigation],
  );

  return <VideoScreenContainer onShowPress={handleShowMovie} />;
};

export default VideoScreen;
