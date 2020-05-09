import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resources/index';
import {Measurements} from 'src/utils/measurements';

const ShowContainer = glamorous.view<{divider: boolean; disabled: boolean}>(
  {
    minHeight: Measurements.screenHeight / 8,
    flex: 1,
    backgroundColor: Res.colors.white,
    shadowColor: Res.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: 'column',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: Res.space.md,
    marginBottom: Res.space.sm,
    padding: Res.space.sm,
  },
  (props) => ({
    marginRight: props.divider ? Res.space.sm : 0,
    backgroundColor: props.disabled ? '#f4f7fc' : '#fff',
  }),
);

const ImageContainer = glamorous.view({
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
});

const ShowImagePreview = glamorous.image<{reversed: boolean}>(
  {
    height: Res.space.xl,
    width: Res.space.xl,
    tintColor: Res.colors.primary,
  },
  (props) => ({
    transform: [{rotateY: props.reversed ? '180deg' : '0deg'}],
  }),
);

const ShowInfoPreview = glamorous.view({
  flex: 1,
});

const Title = glamorous.text({
  ...Res.textStyles.body1,
  fontWeight: '700',
  color: Res.colors.primary,
  textTransform: 'capitalize',
});

const Description = glamorous.text({
  ...Res.textStyles.body2,
  fontWeight: '500',
  color: '#adb7c5',
  textTransform: 'capitalize',
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
    <Button onPress={() => (!data.disabled ? onShowPress(data.id) : {})}>
      <ShowContainer disabled={data.disabled} divider={index % 2 === 0}>
        <ImageContainer>
          <ShowImagePreview reversed={data.reversed} source={data.image} />
        </ImageContainer>
        <Title>{data.name}</Title>
        {data.disabled && <Description>Coming soon</Description>}
      </ShowContainer>
    </Button>
  );
};

export default Show;
