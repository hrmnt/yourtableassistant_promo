import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// @ts-ignore
import videoReducer from 'src/reducers/videos';

// @ts-ignore
const store = createStore(videoReducer, applyMiddleware(thunk));

export default store;
