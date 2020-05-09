import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {Res} from 'src/resources/index';
import {PRODUCT_ACTION} from 'src/types/requestTypes';

const Container = glamorous.view({
  padding: Res.space.md,
  shadowColor: Res.colors.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor: Res.colors.white,
  flexDirection: 'row',
  borderRadius: Res.space.xs,
  alignItems: 'center',
  marginBottom: Res.space.md,
});

const InfoBlock = glamorous.view({
  flex: 2,
  justifyContent: 'center',
});

const ButtonBlock = glamorous.view({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Title = glamorous.text({
  ...Res.textStyles.body2,
  color: '#303547',
  fontWeight: '700',
});

const CountText = glamorous.text({
  ...Res.textStyles.body2,
  color: '#303547',
  fontWeight: '700',
});

const Icon = glamorous.image({
  width: Res.space.lg - 4,
  height: Res.space.lg - 4,
  tintColor: Res.colors.primary,
});

const Button = glamorous.touchableOpacity({
  width: Res.space.lg,
  height: Res.space.lg,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: Res.space.xl,
  borderWidth: 1,
  borderColor: Res.colors.primary,
});

interface ItemProps {
  data: any;
  bucket: any[];
  index: number;
  handleItem?: (item: any, action: PRODUCT_ACTION, count?: number) => void;
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const {data, index, handleItem, bucket} = props;
  const count = () => {
    return bucket.filter((item) => item === data.id).length;
  };

  return (
    <Container key={index}>
      <InfoBlock>
        <Title>{data.name}</Title>
      </InfoBlock>
      <ButtonBlock>
        {handleItem && (
          <Button
            onPress={() => handleItem(data, PRODUCT_ACTION.remove, count())}>
            <Icon source={Res.images.brickIcon} />
          </Button>
        )}
        <CountText>{count()}</CountText>
        {handleItem && (
          <Button onPress={() => handleItem(data, PRODUCT_ACTION.add, count())}>
            <Icon source={Res.images.plusIcon} />
          </Button>
        )}
      </ButtonBlock>
    </Container>
  );
};

export default Item;
