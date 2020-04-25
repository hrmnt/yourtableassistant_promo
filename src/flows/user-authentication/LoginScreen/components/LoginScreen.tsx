import React, {useState, SFC, FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resources/index';
import {DefaultField} from 'src/components';
import {KeyboardAvoidingView} from 'react-native';

const Container = glamorous(KeyboardAvoidingView)({
  flex: 1,
  backgroundColor: Res.colors.third,
  paddingTop: Res.space.md,
});

const Section = glamorous.view({
  justifyContent: 'space-around',
  flex: 1,
});

const BackgroundImage = glamorous.image({
  position: 'absolute',
  zIndex: -1,
});

const Logo = glamorous.image({
  width: Res.space.xxxl * 3,
  height: Res.space.xxxl * 3,
  alignSelf: 'center',
  tintColor: Res.colors.white,
});

const H1 = glamorous.text({
  ...Res.textStyles.title1,
  paddingLeft: Res.space.sm,
  textAlign: 'center',
  color: Res.colors.white,
});

const Description = glamorous.text({
  ...Res.textStyles.body1,
  paddingLeft: Res.space.sm,
  marginVertical: Res.space.md,
  textAlign: 'center',
  color: Res.colors.white,
});

const Button = glamorous.touchableOpacity({
  backgroundColor: Res.colors.primary,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = glamorous.view<{paddingHorizontal?: number}>({}, (props) => ({
  paddingHorizontal: props.paddingHorizontal,
}));

interface LoginScreenProps {
  onSignIn: () => void;
}

const LoginScreen: FunctionComponent<LoginScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container behavior="padding">
      <BackgroundImage source={Res.images.backgroundIcon} />
      <Section>
        <Logo source={Res.images.errorStateIcon} />
        <Wrapper>
          <H1>Welcome back</H1>
          <Description>Please write your credentials to login</Description>
        </Wrapper>
        <Wrapper paddingHorizontal={40}>
          <DefaultField
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
          />
          <DefaultField
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
            placeholder="Password"
          />
        </Wrapper>
        <Wrapper paddingHorizontal={40}>
          <Button onPress={props.onSignIn}>
            <Description>Sign-in</Description>
          </Button>
        </Wrapper>
      </Section>
    </Container>
  );
};

export default LoginScreen;
