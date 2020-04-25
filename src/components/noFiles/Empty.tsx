import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import {Measurements} from 'src/utils/measurements';
import {Res} from 'src/resources';
import {Header} from 'src/components';

const Container = glamorous.view({
  flex: 1,
});

const Icon = glamorous.image({
  width: Measurements.screenWidth / 3,
  height: Measurements.screenWidth / 3,
  alignSelf: 'center',
  marginTop: Measurements.screenWidth / 5,
  tintColor: Res.colors.cyan900,
  marginBottom: Res.space.xxl,
});

const Title = glamorous.text({
  ...Res.textStyles.title2,
  color: Res.colors.cyan900,
  textAlign: 'center',
});

interface EmptyProps {
  id: string;
  onBack: () => void;
}

const Empty: FunctionComponent<EmptyProps> = (props) => {
  return (
    <Container>
      <Header onBack={props.onBack} title={props.id} />
      <Icon source={Res.images.errorStateIcon} />
      <Title>No such products</Title>
    </Container>
  );
};

export default Empty;
