import API from 'src/api/requests';
import {
  LIST_LOAD,
  LIST_SUCCESS,
  LIST_ERROR,
  PRODUCT_ACTION,
} from 'src/types/requestTypes';
import {AsyncStorage} from 'react-native';

export const getListOfCollections = () => async (
  dispatch: (arg0: {type: string; payload: any}) => void,
) => {
  console.log('STARTED');
  dispatch({
    type: `${LIST_LOAD}`,
    payload: {},
  });

  API.getShowLookups()
    .then((res: any) => {
      console.log('RES:', res);
      dispatch({
        type: `${LIST_SUCCESS}`,
        payload: res,
      });
    })
    .catch((e: any) => {
      dispatch({
        type: `${LIST_ERROR}`,
        payload: e,
      });
    });
};

export const toggleFavorite = async (id: number) => {
  try {
    const restoredArray = await getData();
    console.log(restoredArray);
    if (restoredArray !== null) {
      if (restoredArray.includes(id)) {
        const index = restoredArray.indexOf(id);
        restoredArray.splice(index, 1);
        await AsyncStorage.setItem(
          '@favoiteFilms',
          JSON.stringify(restoredArray),
        );
      } else {
        restoredArray.push(id);
        await AsyncStorage.setItem(
          '@favoiteFilms',
          JSON.stringify(restoredArray),
        );
      }
    } else {
      storeData(id);
    }
  } catch (e) {
    // error reading value
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@favoiteFilms');
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    return null;
  }
};

export const storeData = async (id?: number) => {
  try {
    const array = [];
    array.push(id);

    await AsyncStorage.setItem('@favoiteFilms', JSON.stringify(array));
  } catch (e) {
    // saving error
  }
};

export const toggleProduct = (id: string, action: PRODUCT_ACTION) => async (
  dispatch: (arg0: {type: string; payload: any}) => void,
) => {
  dispatch({
    type: action,
    payload: id,
  });
};

export const toggleProductItem = (item: any, action: PRODUCT_ACTION) => async (
  dispatch: (arg0: {type: string; payload: any}) => void,
) => {
  dispatch({
    type: action,
    payload: item,
  });
};
