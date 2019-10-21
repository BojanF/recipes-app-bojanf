import {
  ingredients,
  recipes
} from '../modules';

import { combineReducers } from 'redux';

const appReducer = combineReducers({
  ingredients,
  recipes
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  return finalState;
}