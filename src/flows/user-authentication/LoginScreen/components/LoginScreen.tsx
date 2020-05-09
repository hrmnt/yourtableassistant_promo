import React, {useState, SFC, FunctionComponent} from 'react';
import glamorous from 'glamorous-native';

import {ShowInfo} from 'src/types/types';
import {Res} from 'src/resources/index';
import {DefaultField} from 'src/components';
import {KeyboardAvoidingView} from 'react-native';

const Container = glamorous(KeyboardAvoidingView)({
  flex: 1,
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
  width: Res.space.xxxl * 3.5,
  height: Res.space.xxxl * 1,
  alignSelf: 'center',
  tintColor: Res.colors.white,
});

const H1 = glamorous.text({
  ...Res.textStyles.title2,
  paddingLeft: Res.space.sm,
  textAlign: 'center',
  color: '#2d3546',
});

const Description = glamorous.text({
  ...Res.textStyles.body1,
  paddingLeft: Res.space.sm,
  marginVertical: Res.space.md,
  textAlign: 'center',
  color: Res.colors.white,
  fontWeight: '500',
});

const Button = glamorous.touchableOpacity({
  backgroundColor: Res.colors.primary,
  paddingVertical: Res.space.xs,
  borderRadius: 14,
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = glamorous.view<{paddingHorizontal?: number}>({}, (props) => ({
  paddingHorizontal: props.paddingHorizontal,
}));

interface LoginScreenProps {
  onSignIn: (email: string, password: string) => void;
  user: any;
}

const LoginScreen: FunctionComponent<LoginScreenProps> = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container behavior="padding">
      <Section>
        <Logo source={Res.images.ytaLogo} />
        <Wrapper>
          <H1>Welcome back </H1>
          <Description style={{color: '#c5cad4'}}>
            Please write your credentials to login
          </Description>
        </Wrapper>
        <Wrapper paddingHorizontal={40}>
          <DefaultField
            value={email}
            onChangeText={(value) => setEmail(value)}
            placeholder="Email"
            keyboardType="email-address"
            returnKeyType="next"
            enablesReturnKeyAutomatically
          />
          <DefaultField
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
            placeholder="Password"
            returnKeyLabel="login"
            enablesReturnKeyAutomatically
            onSubmitEditing={() => props.onSignIn(email, password)}
          />
        </Wrapper>
        <Wrapper paddingHorizontal={40}>
          <Button onPress={() => props.onSignIn(email, password)}>
            <Description>Continue</Description>
          </Button>
        </Wrapper>
      </Section>
    </Container>
  );
};

export default LoginScreen;
