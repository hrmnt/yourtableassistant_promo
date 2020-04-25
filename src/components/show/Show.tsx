import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resources/index';
import {Measurements} from 'src/utils/measurements';

const ShowContainer = glamorous.view<{divider: boolean}>(
  {
    height: Measurements.screenHeight / 6,
    flex: 1,
    backgroundColor: Res.colors.white,
    shadowColor: Res.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: Res.space.md,
    marginBottom: Res.space.sm,
  },
  (props) => ({
    marginRight: props.divider ? 0 : Res.space.sm,
  }),
);

const ImageContainer = glamorous.view({
  flex: 3,
  alignItems: 'center',
  justifyContent: 'center',
});

const ShowImagePreview = glamorous.image({
  height: Res.space.xxxl,
  width: Res.space.xxxl,
});

const ShowInfoPreview = glamorous.view({
  flex: 1,
});

const Title = glamorous.text({
  ...Res.textStyles.title2,
  textAlign: 'center',
  color: Res.colors.primary,
  textTransform: 'capitalize',
  flex: 1,
});

const Button = glamorous.touchableOpacity({
  flex: 1,
});

interface ShowProps {
  data: any;
  index: number;
  onShowPress: (id: string) => void;
}

const Show: FunctionComponent<ShowProps> = (props) => {
  const {data, index, onShowPress} = props;
  return (
    <Button onPress={() => onShowPress(data.id)}>
      <ShowContainer divider={index % 2 === 1}>
        <ImageContainer>
          <ShowImagePreview source={Res.images.drinksIcon} />
        </ImageContainer>
        <ShowInfoPreview>
          <Title>{data.name}</Title>
        </ShowInfoPreview>
      </ShowContainer>
    </Button>
  );
};

export default Show;
