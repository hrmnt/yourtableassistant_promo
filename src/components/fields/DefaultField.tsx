import {TextInputProps} from 'react-native';
import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import {Res} from 'src/resources';

const Container = glamorous.view({
  paddingHorizontal: Res.space.xs,
  marginBottom: Res.space.md,
});

const Field = glamorous.textInput({
  ...Res.textStyles.body2White,
  padding: Res.space.xs,
  borderBottomColor: Res.colors.white,
  borderBottomWidth: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  fontSize: 16,
});

interface DefaultFieldProps extends TextInputProps {}

const DefaultField: FunctionComponent<DefaultFieldProps> = (props) => {
  return (
    <Container>
      <Field placeholderTextColor={Res.colors.white} {...props}></Field>
    </Container>
  );
};

export default DefaultField;
