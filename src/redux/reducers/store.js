import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './index';

const saveState = (state) => {
  try {
    localStorage.setItem('state', JSON.stringify(state));
    return undefined;
  } catch (e) {
    return undefined;
  }
};

const loadState = () => {
  try {
    const state = localStorage.getItem('state');
    if (state === null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (e) {
    return undefined;
  }
};

const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);

const persistedState = loadState();
const store = createStoreWithMiddleware(rootReducer, persistedState);


store.subscribe(() => {
  saveState({
    users: { loggedIn: store.getState().users.loggedIn },
  });
});

export default store;
