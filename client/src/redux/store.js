import { createStore } from 'redux';

import reduxReducer from './reducer';

const store = createStore(reduxReducer);

export default store;
