import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import API from 'src/api/requests';

import {OrderHistory} from '../components';
import {connect, ConnectedProps} from 'react-redux';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {toggleProduct, toggleProductItem} from 'src/actions/listActions';
import {Empty, BucketButton} from 'src/components';
import {Alert} from 'react-native';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface OrderHistoryContainerProps extends PropsFromRedux {
  onBack: () => void;
  id: string;
}

const OrderHistoryContainer: FunctionComponent<OrderHistoryContainerProps> = (
  props,
) => {
  const [items, setItems] = useState([]);

  const handleShows = useCallback(async () => {
    const ss = await API.getHistory();
    console.log(ss);
    setItems(ss);
  }, [props.id]);

  const handleItem = useCallback(
    (item: any, action: PRODUCT_ACTION, count?: number) => {
      console.log(item, count);
      if (count === 0 && action === PRODUCT_ACTION.add) {
        props.toggleProductItem(item, PRODUCT_ACTION.itemAdd);
      }
      if (count === 1 && action === PRODUCT_ACTION.remove) {
        props.toggleProductItem(item, PRODUCT_ACTION.itemRemove);
      }
      props.toggleProduct(item.id, action);
    },
    [props],
  );

  const closeOrder = useCallback((order) => {
    const newOrder = {
      ...order,
      closed: true,
      closeTime: new Date(),
    };
    console.log('NEWORDER:', newOrder);
    Alert.alert(
      'Какие изменения?',
      '',
      [
        {
          text: 'Закрыть заказ',
          onPress: () => {
            API.changeOrder(newOrder);
            handleShows();
            // props.onMainScreen();
          },
        },
      ],
      {cancelable: false},
    );
  }, []);

  useEffect(() => {
    console.log('HISTORY');
    handleShows();
  }, []);

  if (items.length === 0) {
    return (
      <>
        <Empty onBack={props.onBack} id={props.id} />
        {props.bucket.length > 0 && <BucketButton />}
      </>
    );
  }

  return (
    <>
      <OrderHistory
        handleItem={handleItem}
        onBack={props.onBack}
        items={items}
        bucket={props.bucket}
        id={props.id}
        closeOrder={closeOrder}
      />
      {props.bucket.length > 0 && <BucketButton />}
    </>
  );
};

const mapStateToProps = (store: any) => ({
  bucket: store.bucket,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  toggleProduct: (id: string, action: PRODUCT_ACTION) =>
    dispatch(toggleProduct(id, action)),
  toggleProductItem: (item: any, action: PRODUCT_ACTION) =>
    dispatch(toggleProductItem(item, action)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(OrderHistoryContainer);
