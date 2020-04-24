import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import API from 'src/api/requests';

import {VideoScreen} from '../components';

interface VideoScreenContainerProps {
  onBack: () => void;
  id: number;
}

const VideoScreenContainer: FunctionComponent<VideoScreenContainerProps> = (
  props,
) => {
  const [film, setFilm] = useState({});

  const handleShows = useCallback(() => {
    console.log('HANDLE_SHOWS');
    API.getDetailedShow(props.id).then((res: any) => {
      setFilm(res.data);
    });
  }, [props.id]);

  useEffect(() => {
    handleShows();
  }, []);

  return <VideoScreen onBack={props.onBack} film={film} id={props.id} />;
};

export default VideoScreenContainer;
