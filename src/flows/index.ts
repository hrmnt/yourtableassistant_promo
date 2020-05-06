import {mainVideoFlow} from './main-video';
import {authorizationFlow} from './user-authentication';
import {mainOrdersFlow} from './main-orders';

export const allFlows = [mainOrdersFlow, authorizationFlow, mainVideoFlow];

export {mainOrdersFlow, authorizationFlow, mainVideoFlow};
