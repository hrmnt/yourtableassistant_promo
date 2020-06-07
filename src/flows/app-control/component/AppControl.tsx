import React, {FunctionComponent} from 'react';
import {ActivityIndicator} from 'react-native';
import glamorous from 'glamorous-native';
import {Res} from 'src/resources';

const Container = glamorous.view({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

interface AppControlProps {}

const AppControl: FunctionComponent<AppControlProps> = () => {
  return (
    <Container>
      <ActivityIndicator color={Res.colors.primary} size="large" />
    </Container>
  );
};

export default AppControl;
