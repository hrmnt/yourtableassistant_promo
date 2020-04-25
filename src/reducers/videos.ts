import {
  LIST_LOAD,
  LIST_ERROR,
  LIST_SUCCESS,
  PRODUCT_ACTION,
} from 'src/types/requestTypes';
import initalState from 'src/redux/initialState';
import {deleteItem} from 'src/utils/data-types';

export default function videosReducer(
  state = initalState.videos,
  action: {type: any; payload: any | null},
) {
  switch (action.type) {
    case LIST_LOAD:
      return {...state, loading: true};
    case LIST_SUCCESS:
      return {...state, loading: false, list: action.payload};
    case LIST_ERROR:
      return {...state, loading: false, list: action.payload};
    case PRODUCT_ACTION.add: {
      const bucketList = [...state.bucket, action.payload];
      return {
        ...state,
        loading: false,
        bucket: bucketList,
      };
    }
    case PRODUCT_ACTION.remove: {
      const bucketList = [...state.bucket];
      const newList = deleteItem(bucketList, action.payload);
      return {
        ...state,
        loading: false,
        bucket: newList,
      };
    }
    default:
      return state;
  }
}
