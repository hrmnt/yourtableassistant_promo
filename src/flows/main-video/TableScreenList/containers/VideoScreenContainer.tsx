import {connect, ConnectedProps} from 'react-redux';
import React, {FunctionComponent, useCallback, useEffect} from 'react';

import {} from 'react-navigation';
import {Header, BucketButton} from 'src/components';
import {
  getListOfCollections,
  getListOfTables,
  toggleProduct,
} from 'src/actions/listActions';

import {VideoScreen} from '../components';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {Alert} from 'react-native';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface VideoScreenContainerProps extends PropsFromRedux {
  onShowPress: (id: string) => void;
  handleBackButton: () => void;
}

const VideoScreenContainer: FunctionComponent<VideoScreenContainerProps> = (
  props,
) => {
  const handleCollection = useCallback(() => {
    props.getList();
  }, [props]);

  useEffect(() => {
    handleCollection();
  }, []);

  const onShowPress = async (id: string) => {
    const table = await props.films.filter(
      (film: {id: string}) => film.id === id,
    );
    await props.toggleProduct(table[0].name, PRODUCT_ACTION.tableAdd);
    props.onShowPress('');
  };

  return (
    <>
      <Header title="Столы" onBack={props.handleBackButton} />
      <VideoScreen onShowPress={onShowPress} films={props.films} />
      {props.bucket.length > 0 && <BucketButton />}
    </>
  );
};
const mapStateToProps = (store: any) => ({
  films: store.list,
  bucket: store.bucket,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  getList: () => dispatch(getListOfTables()),
  toggleProduct: (id: string, action: PRODUCT_ACTION) =>
    dispatch(toggleProduct(id, action)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VideoScreenContainer);
