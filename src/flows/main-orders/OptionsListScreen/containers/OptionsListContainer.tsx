import {connect, ConnectedProps} from 'react-redux';
import React, {FunctionComponent} from 'react';

import {} from 'react-navigation';
import {Header, BucketButton} from 'src/components';
import {getListOfCollections} from 'src/actions/listActions';

import {OptionsList} from '../components';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OptionsListContainerProps extends PropsFromRedux {
  onShowPress: (id: string) => void;
}

const OptionsListContainer: FunctionComponent<OptionsListContainerProps> = (
  props,
) => {
  const menuOptions = [
    {
      name: 'Новый заказ',
      id: 'VideoScreenList',
    },
    {
      name: 'История',
      id: 'VideoScreenList',
    },
    {
      name: 'История',
      id: 'VideoScreenList',
    },
  ];

  return (
    <>
      <Header title="Main menu" />
      <OptionsList
        menuOptions={menuOptions}
        onShowPress={props.onShowPress}
        films={props.films}
      />
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

export default connector(OptionsListContainer);
