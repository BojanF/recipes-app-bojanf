// @flow

import { fork, all } from 'redux-saga/effects';
import {
  ingredientsSaga,
  recipesSaga  
} from '../modules';

export default function* rootSaga() {
  yield all([
    fork(ingredientsSaga),
    fork(recipesSaga)
  ]);
}
