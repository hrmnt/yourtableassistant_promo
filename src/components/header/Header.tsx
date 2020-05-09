import React, {FunctionComponent} from 'react';
import {Header as HH} from 'react-navigation';
import glamorous from 'glamorous-native';
import {Res} from 'src/resources';

const Container = glamorous.view({
  height: HH.HEIGHT + HH.HEIGHT / 2,
  justifyContent: 'flex-end',
  paddingBottom: 10,
  flexDirection: 'row',
  backgroundColor: Res.colors.primary,
  borderBottomColor: Res.colors.translucentWhite,
  borderBottomWidth: 1,
});

const Left = glamorous.view({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
});

const Block = glamorous.view({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
});

const Right = glamorous.view({
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
});

const Title = glamorous.text({
  ...Res.textStyles.title2White,
  fontSize: 18,
  lineHeight: 18,
});

const Button = glamorous.touchableOpacity({});

const Icon = glamorous.image({
  width: Res.space.xl / 1.5,
  height: Res.space.xl / 1.5,
  tintColor: Res.colors.white,
  marginLeft: Res.space.sm,
});

interface HeaderProps {
  title: string;
  onBack?: () => void;
  main?: boolean;
}

const Header: FunctionComponent<HeaderProps> = (props) => {
  if (props.main) {
    return (
      <Container
        style={{
          backgroundColor: Res.colors.white,
          paddingHorizontal: Res.space.md,
        }}>
        <Block style={{alignItems: 'flex-start'}}>
          <Title style={{color: '#303547', fontWeight: '700'}}>
            {props.title}
          </Title>
        </Block>
      </Container>
    );
  }
  return (
    <Container>
      <Left>
        {props.onBack && (
          <Button onPress={props.onBack}>
            <Icon source={Res.images.backButtonIcon} />
          </Button>
        )}
      </Left>
      <Block>
        <Title>{props.title}</Title>
      </Block>
      <Right></Right>
    </Container>
  );
};

export default Header;
