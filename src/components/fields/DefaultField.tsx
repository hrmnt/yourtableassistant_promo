import {TextInputProps} from 'react-native';
import React, {FunctionComponent} from 'react';
import glamorous from 'glamorous-native';
import {Res} from 'src/resources';

const Container = glamorous.view({
  paddingHorizontal: Res.space.xs,
  paddingVertical: Res.space.md,
  marginBottom: Res.space.md,
  backgroundColor: Res.colors.secondary,
  borderColor: '#eaebf3',
  borderWidth: 1,
  borderRadius: 14,
});

const Field = glamorous.textInput({
  ...Res.textStyles.body2White,
  padding: Res.space.xs,
  fontSize: 16,
  color: Res.colors.black,
});

interface DefaultFieldProps extends TextInputProps {}

const DefaultField: FunctionComponent<DefaultFieldProps> = (props) => {
  return (
    <Container>
      <Field placeholderTextColor={'#cad6e4'} {...props}></Field>
    </Container>
  );
};

export default DefaultField;
