import {
    put,
    fork,
    all,
    take,
} from 'redux-saga/effects';

import {
    GET_ALL_RECIPES,
    recipesActionCreators,
    ADD_RECIPE,
    DELETE_RECIPE,
    GET_RECIPE
} from './actions';



export function* asyncGetAllRecipes({ payload, resolve, reject }) {

    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(recipesActionCreators.getAllRecipesSuccess({}));
            resolve('SAGA: All recipes');
        } else {
            // reject(response.message);
            reject("ERROR")
        }

    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* asyncAddRecipe ({ payload, resolve, reject }) {
    const { newRecipe } = payload;
    console.log('SAGA: ', newRecipe);
    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(recipesActionCreators.addRecipeSuccess({ newRecipe }));
            resolve('Succesfully added new recipe');
        } else {
            reject("ERROR")
        }
    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* asyncDeleteRecipe ({ payload, resolve, reject }) {
    const { recipeId } = payload;
    console.log('SAGA: DELETE_RECIPE', recipeId);
    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(recipesActionCreators.deleteRecipeSuccess({ recipeId }));
            resolve('Succesfully deleted recipe');
        } else {
            reject("ERROR")
        }
    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* asyncGetRecipe ({ payload, resolve, reject }) {
    const { recipeId } = payload;
    console.log('SAGA: GET_RECIPE', recipeId);
    try {
        // Here should be http call to the server
        const response = {
            result: 'ok'
        }
        if (response.result === 'ok') {
            yield put(recipesActionCreators.getRecipeSuccess({ recipeId }));
            resolve('Succesfully fetched recipe');
        } else {
            reject("ERROR")
        }
    } catch (e) {
        console.log(e);
        reject(e);
    }
}

export function* watchGetAllRecipes() {
    while (true) {
        const action = yield take(GET_ALL_RECIPES);
        yield* asyncGetAllRecipes(action)
    }
}

export function* watchAddRecipe() {
    while (true) {
        const action = yield take(ADD_RECIPE);
        yield* asyncAddRecipe(action)
    }
}

export function* watchDeleteRecipe() {
    while (true) {
        const action = yield take(DELETE_RECIPE);
        yield* asyncDeleteRecipe(action)
    }
}

export function* watchGetRecipe() {
    while (true) {
        const action = yield take(GET_RECIPE);
        yield* asyncGetRecipe(action)
    }
}

export default function* () {
    yield all([
        fork(watchGetAllRecipes),
        fork(watchAddRecipe),
        fork(watchDeleteRecipe),
        fork(watchGetRecipe)
    ]);
}
