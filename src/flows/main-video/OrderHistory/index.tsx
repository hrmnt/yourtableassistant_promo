import React from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {OrderHistoryContainer} from './containers';

interface TypeListProps {}

const OrderHistoryScreen: NavigationScreenComponent<TypeListProps> = (
  props,
) => {
  const handleBackButton = () => {
    props.navigation.goBack();
  };

  return (
    <OrderHistoryContainer
      onBack={handleBackButton}
      id={props.navigation.getParam('id')}
    />
  );
};

export default OrderHistoryScreen;
