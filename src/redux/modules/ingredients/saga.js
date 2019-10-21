import {
    put,
    fork,
    all,
    take,
} from 'redux-saga/effects';

import {
    ADD_INGREDIENT,
    GET_INGREDIENTS,
    ingredientsActionCreators
} from './actions';

export function* asyncGetIngredients({ payload, resolve, reject }) {
    console.log('FROM SAGA');
    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(ingredientsActionCreators.getIngredientsSuccess({}));
            resolve('SUCCESS FROM SAGA');
        } else {
            reject("ERROR")
        }

    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* asyncAddIngredient({ payload, resolve, reject }) {
    
    const { newIngredient } = payload;
    console.log('FROM SAGA: ', newIngredient);
    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(ingredientsActionCreators.addIngredientSuccess({newIngredient}));
            resolve('SUCCESS FROM SAGA ADD INGREDIENT');
        } else {
            reject("ERROR")
        }

    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* watchGetIngredients() {
    while (true) {
        const action = yield take(GET_INGREDIENTS);
        yield* asyncGetIngredients(action)
    }
}

export function* watchAddIngredient() {
    while (true) {
        const action = yield take(ADD_INGREDIENT);
        yield* asyncAddIngredient(action)
    }
}

export default function* () {
    yield all([
        fork(watchGetIngredients),
        fork(watchAddIngredient)
    ]);
}
