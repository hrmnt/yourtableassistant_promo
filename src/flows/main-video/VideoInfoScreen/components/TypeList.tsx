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

interface TypeListProps {
  items: any[];
  id: string;
  bucket: any[];
  onBack: () => void;
  handleItem: (id: string, action: PRODUCT_ACTION) => void;
}

const TypeList: FunctionComponent<TypeListProps> = (props) => {
  const renderItem = (data: any) => {
    console.log(props.bucket);
    return (
      <Item
        bucket={props.bucket}
        handleItem={props.handleItem}
        index={data.index}
        data={data.item}
      />
    );
  };
  return (
    <Container>
      <Header onBack={props.onBack} title={props.id} />
      <ItemsList
        contentContainerStyle={{padding: Res.space.md}}
        data={props.items}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default TypeList;
