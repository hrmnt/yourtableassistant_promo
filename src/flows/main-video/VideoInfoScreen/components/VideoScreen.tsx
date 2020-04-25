import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import isBase from '@sindresorhus/is';
import {Transition} from 'react-navigation-fluid-transitions';

import {Measurements} from 'src/utils/measurements';
import {Res} from 'src/resources/index';
import {Header} from 'src/components';

const Container = glamorous.scrollView({
  flex: 1,
  backgroundColor: Res.colors.primary,
});

const ShowImagePreview = glamorous.image({
  height: Measurements.screenHeight / 3,
  width: Measurements.screenWidth,
});

const Description = glamorous.text({
  ...Res.textStyles.title2White,
  paddingLeft: Res.space.sm,
  marginVertical: Res.space.md,
});

interface VideoScreenProps {
  film: any;
  id: number;
  onBack: () => void;
}

const VideoScreen: FunctionComponent<VideoScreenProps> = (props) => {
  console.log('FILM:', props.film);
  return (
    <Container>
      <Header onBack={props.onBack} title={props.film.name} />
      <Transition appear="vertical" shared={String(props.id)}>
        <ShowImagePreview
          source={{
            uri: !isBase.nullOrUndefined(props.film.image)
              ? props.film.image.medium
              : 'https://static.tvmaze.com/images/no-img/no-img-portrait-text.png',
          }}
        />
      </Transition>
      <Description>{props.film.summary}</Description>
    </Container>
  );
};

export default VideoScreen;
