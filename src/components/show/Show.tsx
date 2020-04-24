import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import isBase from '@sindresorhus/is';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resource/index';
import {Measurements} from 'src/utils/measurements';
import {Transition} from 'react-navigation-fluid-transitions';

const ShowContainer = glamorous.view<{divider: boolean}>(
  {
    height: Measurements.screenHeight / 3.5,
    flex: 1,
    backgroundColor: Res.colors.secondary,
    marginBottom: Res.space.sm,
  },
  (props) => ({
    marginRight: props.divider ? 0 : Res.space.sm,
  }),
);

const ImageContainer = glamorous.view({
  flex: 3,
});

const ShowImagePreview = glamorous.image({
  height: '100%',
  width: '100%',
});

const ShowInfoPreview = glamorous.view({
  flex: 1,
});

const ShowActionContainer = glamorous.view({
  flex: 1,
  paddingHorizontal: Res.space.xs,
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Title = glamorous.text({
  ...Res.textStyles.body2,
  color: Res.colors.third,
  paddingLeft: Res.space.xs,
  flex: 1,
  paddingTop: Res.space.xs,
});

const Block = glamorous.view<{favorite?: boolean}>(
  {
    flex: 1,
    flexDirection: 'row',
  },
  (props) => ({
    backgroundColor: props.favorite && props.favorite ? 'red' : 'transparent',
  }),
);

const Icon = glamorous.image({
  width: 20,
  height: 20,
  tintColor: Res.colors.third,
  marginRight: Res.space.xs,
  right: 0,
});

const InfoTitle = glamorous.text({
  ...Res.textStyles.body2,
  color: Res.colors.third,
});

const Button = glamorous.touchableOpacity({
  flex: 1,
});

interface ShowProps {
  data: ShowInfo;
  index: number;
  favorites: Number[];
  onFavorite: (id: number) => void;
  onShowPress: (id: number) => void;
}

const Show: FunctionComponent<ShowProps> = (props) => {
  const {data, index, onShowPress} = props;
  return (
    <Button onPress={() => onShowPress(data.id)}>
      <ShowContainer divider={index % 3 === 2}>
        <ImageContainer>
          <Transition appear="flip" shared={String(data.id)}>
            <ShowImagePreview
              source={{
                uri: !isBase.nullOrUndefined(data.image)
                  ? data.image.medium
                  : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png',
              }}
            />
          </Transition>
        </ImageContainer>
        <ShowInfoPreview>
          <Title>{data.name}</Title>
          <ShowActionContainer>
            <Block>
              <Icon source={Res.images.circledStarIcon} />
              <InfoTitle>{data.rating.average}</InfoTitle>
            </Block>
            <Button onPress={() => props.onFavorite(data.id)}>
              <Block
                favorite={props.favorites && props.favorites.includes(data.id)}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  justifyContent: 'flex-end',
                }}>
                <Icon source={Res.images.circledThumbsUpIcon} />
              </Block>
            </Button>
          </ShowActionContainer>
        </ShowInfoPreview>
      </ShowContainer>
    </Button>
  );
};

export default Show;
