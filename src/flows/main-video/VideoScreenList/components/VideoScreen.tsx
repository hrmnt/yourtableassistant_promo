import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resource/index';
import {Show} from 'src/components';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: Res.colors.primary,
  paddingTop: Res.space.md,
});
const Section = glamorous.view({});

const VideoList = glamorous.flatList({});

const H1 = glamorous.text({
  ...Res.textStyles.title2White,
  paddingLeft: Res.space.sm,
  marginVertical: Res.space.md,
});

interface VideoScreenProps {
  films: ShowInfo[];
  favorites: Number[];
  onEndReached: () => void;
  onShowPress: (id: number) => void;
  onFavorite: (id: number) => void;
}

interface IRenderData {
  item: ShowInfo;
  index: number;
}

const VideoScreen: FunctionComponent<VideoScreenProps> = (props) => {
  const renderItem = (data: IRenderData) => {
    // console.log(props.favorites);
    return (
      <Show
        favorites={props.favorites}
        onFavorite={props.onFavorite}
        onShowPress={props.onShowPress}
        index={data.index}
        data={data.item}
      />
    );
  };

  return (
    <Container>
      <Section>
        <VideoList
          numColumns={3}
          data={props.films}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => props.onEndReached()}
          contentContainerStyle={{
            paddingBottom: Res.space.xxl,
          }}
        />
      </Section>
    </Container>
  );
};

export default VideoScreen;
