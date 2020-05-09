import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resources/index';
import {Show} from 'src/components';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: Res.colors.white,
});
const VideoList = glamorous.flatList({});

interface OptionsListProps {
  films: ShowInfo[];
  menuOptions: any[];
  onShowPress: (id: string) => void;
}

interface IRenderData {
  item: ShowInfo;
  index: number;
}

const OptionsList: FunctionComponent<OptionsListProps> = (props) => {
  const renderItem = (data: IRenderData) => {
    return (
      <Show
        onShowPress={props.onShowPress}
        index={data.index}
        data={data.item}
      />
    );
  };

  return (
    <Container>
      <VideoList
        columnWrapperStyle={{
          padding: Res.space.md,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        numColumns={2}
        data={props.menuOptions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: Res.space.xxl,
        }}
      />
    </Container>
  );
};

export default OptionsList;
