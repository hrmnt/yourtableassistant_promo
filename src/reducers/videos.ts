import {LIST_LOAD, LIST_ERROR, LIST_SUCCESS} from 'src/types/requestTypes';
import initalState from 'src/redux/initialState';

export default function videosReducer(
  state = initalState.videos,
  action: {type: any; payload: {data: any; error: any}},
) {
  switch (action.type) {
    case LIST_LOAD:
      return {...state, loading: true};
    case LIST_SUCCESS:
      console.log(action.payload);
      return {...state, loading: false, list: action.payload};
    case LIST_ERROR:
      return {...state, loading: false, list: action.payload};
    default:
      return state;
  }
}
