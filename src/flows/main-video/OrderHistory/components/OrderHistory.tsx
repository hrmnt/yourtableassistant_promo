import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {Res} from 'src/resources/index';
import {Header, Item} from 'src/components';
import {PRODUCT_ACTION} from 'src/types/requestTypes';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: Res.colors.white,
});

const ItemsList = glamorous.flatList({});

interface OrderHistoryProps {
  items: any[];
  id: string;
  bucket: any[];
  onBack: () => void;
  handleItem: (item: any, action: PRODUCT_ACTION, count?: number) => void;
  closeOrder: (order: any) => void;
}

const History = glamorous.view({
  marginBottom: 10,
  flexDirection: 'row',
  alignItems: 'center',
});

const OrderDone = glamorous.touchableOpacity({
  borderRadius: 30,
  height: 40,
  width: 40,
  backgroundColor: '#f4f7fc',
  marginRight: Res.space.md,
  alignItems: 'center',
  justifyContent: 'center',
});

const Icon = glamorous.image({
  height: 20,
  width: 20,
  tintColor: '#626472',
});

const HistoryContainer = glamorous.view({
  backgroundColor: 'rgba(83,141,204, 0.35)',
  height: 100,
  borderRadius: 10,
  flex: 1,
  padding: Res.space.md,
  justifyContent: 'space-between',
});

const PardonName = glamorous.text({
  ...Res.textStyles.body2,
  textTransform: 'capitalize',
  color: '#6896d4',
  fontWeight: '700',
});
const Description = glamorous.text({
  ...Res.textStyles.body1,
  textTransform: 'capitalize',
  color: '#292d3f',
  fontWeight: '700',
});

const Price = glamorous.text({
  color: '#9da6b6',
});

const OrderHistory: FunctionComponent<OrderHistoryProps> = (props) => {
  const renderItem = (data: any) => {
    console.log(data);
    return (
      <History>
        <OrderDone onPress={() => props.closeOrder(data.item)}>
          <Icon source={Res.images.giftBoxIcon} />
        </OrderDone>
        <HistoryContainer
          style={{
            backgroundColor: data.item.closed
              ? '#C3DA8C'
              : 'rgba(83,141,204, 0.35)',
          }}>
          <PardonName>{data.item.user.name}</PardonName>
          <Description>Orders: {data.item.bucket.length}</Description>
          <Price>
            x{data.item.bucket.length} = {data.item.bucket.length * 400} ₸
          </Price>
        </HistoryContainer>
      </History>
    );
  };
  return (
    <Container>
      <Header onBack={props.onBack} title={'History'} />
      <ItemsList
        contentContainerStyle={{padding: Res.space.md}}
        data={props.items}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default OrderHistory;
