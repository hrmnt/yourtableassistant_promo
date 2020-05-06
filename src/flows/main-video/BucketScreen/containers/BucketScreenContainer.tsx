import React, {FunctionComponent, useCallback} from 'react';

import {BucketScreen} from '../components';
import {connect, ConnectedProps} from 'react-redux';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {toggleProduct, makeOrder} from 'src/actions/listActions';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface BucketScreenContainerProps extends PropsFromRedux {
  onBack: () => void;
  id: string;
}

const BucketScreenContainer: FunctionComponent<BucketScreenContainerProps> = (
  props,
) => {
  // const [items, setItems] = useState([]);

  // const handleShows = useCallback(() => {
  //   API.getDetailedShow(props.id).then((res: any) => {
  //     setItems(res);
  //   });
  // }, [props.id]);

  // const handleItem = useCallback(
  //   (id: string, action: PRODUCT_ACTION) => {
  //     props.toggleProduct(id, action);
  //   },
  //   [props],
  // );

  // useEffect(() => {
  //   handleShows();
  // }, []);

  const handleOrder = () => useCallback(() => {
    props.makeOrder({})
  }, []);

  return (
    <BucketScreen
      onBack={props.onBack}
      bucketItemList={props.bucketItemList}
      bucket={props.bucket}
    />
  );
};

const mapStateToProps = (store: any) => ({
  bucket: store.bucket,
  bucketItemList: store.bucketItemList,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  toggleProduct: (id: string, action: PRODUCT_ACTION) =>
    dispatch(toggleProduct(id, action)),
  makeOrder: (order: any) => dispatch(makeOrder(order)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BucketScreenContainer);
