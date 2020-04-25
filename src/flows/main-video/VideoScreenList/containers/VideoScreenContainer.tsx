import {connect, ConnectedProps} from 'react-redux';
import React, {FunctionComponent, useCallback, useEffect} from 'react';

import {} from 'react-navigation';
import {Header, BucketButton} from 'src/components';
import {getListOfCollections} from 'src/actions/listActions';

import {VideoScreen} from '../components';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface VideoScreenContainerProps extends PropsFromRedux {
  onShowPress: (id: string) => void;
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

  return (
    <>
      <Header title="Collection" />
      <VideoScreen onShowPress={props.onShowPress} films={props.films} />
      {props.bucket.length > 0 && <BucketButton />}
    </>
  );
};
const mapStateToProps = (store: any) => ({
  films: store.list,
  bucket: store.bucket,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  getList: () => dispatch(getListOfCollections()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(VideoScreenContainer);
