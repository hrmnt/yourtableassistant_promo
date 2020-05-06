import React, {useCallback} from 'react';
import {NavigationScreenComponent} from 'react-navigation';

import {OptionsListContainer} from './containers';

interface OptionsListProps {}

const OptionsList: NavigationScreenComponent<OptionsListProps> = (props) => {
  const handleShowMovie = useCallback(
    (screenName: string) => {
      props.navigation.navigate(screenName);
    },
    [props.navigation],
  );

  return <OptionsListContainer onShowPress={handleShowMovie} />;
};

export default OptionsList;
