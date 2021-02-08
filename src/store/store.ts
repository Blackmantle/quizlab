import { configureStore } from '@reduxjs/toolkit';
import reducer from './rootReducer';
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';

const preloadedState = loadState();

const store = configureStore({ reducer, preloadedState });

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store;
