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
  color: Res.colors.primary,
  fontWeight: '700',
});

const CountText = glamorous.text({
  ...Res.textStyles.body2,
  color: Res.colors.cyan900,
  fontWeight: '700',
});

const Icon = glamorous.image({
  width: Res.space.lg - 4,
  height: Res.space.lg - 4,
  tintColor: Res.colors.cyan900,
});

const Button = glamorous.touchableOpacity({
  width: Res.space.lg,
  height: Res.space.lg,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: Res.space.xl,
  borderWidth: 1,
  borderColor: Res.colors.cyan900,
});

interface ItemProps {
  data: any;
  bucket: any[];
  index: number;
  handleItem: (id: string, action: PRODUCT_ACTION) => void;
}

const Item: FunctionComponent<ItemProps> = (props) => {
  const {data, index, handleItem, bucket} = props;
  const count = () => {
    console.log('COUNT', bucket, data);
    return bucket.filter((item) => item === data.id).length;
  };

  return (
    <Container key={index}>
      <InfoBlock>
        <Title>{data.name}</Title>
      </InfoBlock>
      <ButtonBlock>
        <Button onPress={() => handleItem(data.id, PRODUCT_ACTION.add)}>
          <Icon source={Res.images.plusIcon} />
        </Button>
        <CountText>{count()}</CountText>
        <Button onPress={() => handleItem(data.id, PRODUCT_ACTION.remove)}>
          <Icon source={Res.images.brickIcon} />
        </Button>
      </ButtonBlock>
    </Container>
  );
};

export default Item;
