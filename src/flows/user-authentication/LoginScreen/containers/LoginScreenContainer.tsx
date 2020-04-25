import {connect, ConnectedProps} from 'react-redux';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {} from 'react-navigation';
import {getListOfShows, toggleFavorite, getData} from 'src/actions/listActions';

import {LoginScreen} from '../components';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface LoginScreenContainerProps extends PropsFromRedux {
  onSignIn: () => void;
}

const LoginScreenContainer: FunctionComponent<LoginScreenContainerProps> = (
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
      <LoginScreen onSignIn={props.onSignIn} />
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

export default connector(LoginScreenContainer);
