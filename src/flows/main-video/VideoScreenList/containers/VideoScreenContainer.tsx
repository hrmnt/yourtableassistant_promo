import {connect, ConnectedProps} from 'react-redux';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {} from 'react-navigation';
import {Header} from 'src/components';
import {getListOfShows, toggleFavorite, getData} from 'src/actions/listActions';

import {VideoScreen} from '../components';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface VideoScreenContainerProps extends PropsFromRedux {
  onShowPress: (id: number) => void;
}

const VideoScreenContainer: FunctionComponent<VideoScreenContainerProps> = (
  props,
) => {
  const [favoriteShows, setFavoriteShow] = useState<Number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handleShows = useCallback(() => {
    props.getList(currentPage);
  }, [currentPage, props]);

  const handleEndReached = useCallback(async () => {
    await setCurrentPage(currentPage + 1);
    handleShows();
  }, [currentPage, handleShows]);

  const handleFavotites = useCallback(async () => {
    const favorites = await getData();
    console.log(favorites);
    if (favorites !== null) {
      setFavoriteShow(favorites);
    }
  }, []);

  const handleFavorite = useCallback(
    async (id) => {
      console.log(id);
      await toggleFavorite(id);
      handleFavotites();
    },
    [handleFavotites],
  );

  useEffect(() => {
    handleShows();
    handleFavotites();
  }, []);

  return (
    <>
      <Header title="Available Now" />
      <VideoScreen
        onShowPress={props.onShowPress}
        onEndReached={handleEndReached}
        onFavorite={handleFavorite}
        films={props.films}
        favorites={favoriteShows}
      />
    </>
  );
};
const mapStateToProps = (store: any) => ({
  films: store.list,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  getList: (page: number) => dispatch(getListOfShows(page)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VideoScreenContainer);
