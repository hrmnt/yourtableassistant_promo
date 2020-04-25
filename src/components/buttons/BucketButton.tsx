import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import {connect, ConnectedProps} from 'react-redux';
import {withNavigation, NavigationParams} from 'react-navigation';

import {toggleProduct} from 'src/actions/listActions';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {Res} from 'src/resources';
import {Measurements} from 'src/utils/measurements';

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

interface BucketButtonProps extends PropsFromRedux {
  navigation: NavigationParams;
}

const BucketButton: FunctionComponent<BucketButtonProps> = (props) => {
  return (
    <Container
      onPress={() => {
        console.log(props.navigation.navigate('BucketScreen'));
      }}>
      <Title>Order ({props.bucket.length})</Title>
    </Container>
  );
};

const mapStateToProps = (store: any) => ({
  bucket: store.bucket,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  toggleProduct: (id: string, action: PRODUCT_ACTION) =>
    dispatch(toggleProduct(id, action)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default withNavigation(connector(BucketButton));
