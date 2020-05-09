import React, {FunctionComponent, useCallback} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {BucketScreen} from '../components';
import {connect, ConnectedProps} from 'react-redux';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {toggleProduct, makeOrder, clearBucket} from 'src/actions/listActions';
import glamorous from 'glamorous-native';
import {Measurements} from 'src/utils/measurements';
import {Res} from 'src/resources';
import {Alert} from 'react-native';

const Container = glamorous.touchableOpacity({
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: Measurements.safeAreaBottomInset
    ? Measurements.safeAreaBottomInset + Res.space.md
    : Res.space.md,
  backgroundColor: Res.colors.primary,
  paddingTop: Res.space.md,
});

const Title = glamorous.text({
  ...Res.textStyles.body1White,
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface BucketScreenContainerProps extends PropsFromRedux {
  onBack: () => void;
  id: string;
  onMainScreen: () => void;
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

  const handleOrder = async () => {
    const currentUser = auth().currentUser;
    console.log(currentUser);
    const newBucket: any[] = [];
    props.bucketItemList.map((item: any) => {
      const list = props.bucket.filter((id: string) => id === item.id);
      newBucket.push({...item, count: list.length});
    });

    if (currentUser) {
      const result = await props
        .makeOrder({
          user: {
            name: currentUser.displayName,
            uid: currentUser.uid,
          },
          bucket: newBucket,
        })
        .then((res) => {
          Alert.alert(
            'Order was accepted!',
            '',
            [
              {
                text: 'Ok',
                onPress: () => {
                  props.clearBucket();
                  props.onMainScreen();
                },
              },
            ],
            {cancelable: false},
          );
        });
    }
  };

  return (
    <>
      <BucketScreen
        onBack={props.onBack}
        bucketItemList={props.bucketItemList}
        onOrder={handleOrder}
        bucket={props.bucket}
      />
      <Container
        onPress={() => {
          handleOrder();
        }}>
        <Title>Order ({props.bucket.length})</Title>
      </Container>
    </>
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
  clearBucket: () => dispatch(clearBucket()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(BucketScreenContainer);
