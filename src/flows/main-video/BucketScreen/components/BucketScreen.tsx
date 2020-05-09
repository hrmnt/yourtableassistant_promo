import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {Res} from 'src/resources/index';
import {Header, Item} from 'src/components';

const Container = glamorous.view({
  flex: 1,
  backgroundColor: Res.colors.white,
});

const ItemsList = glamorous.flatList({});

interface BucketScreenProps {
  bucket: any[];
  bucketItemList: any[];
  onBack: () => void;
  onOrder: (bucket: any) => void;
}

const BucketScreen: FunctionComponent<BucketScreenProps> = (props) => {
  const renderItem = (data: any) => {
    return <Item bucket={props.bucket} index={data.index} data={data.item} />;
  };
  return (
    <Container>
      <Header onBack={props.onBack} title={'Bucket'} />
      <ItemsList
        contentContainerStyle={{padding: Res.space.md}}
        data={props.bucketItemList}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default BucketScreen;
