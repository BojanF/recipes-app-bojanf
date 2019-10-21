import {
    ADD_RECIPE,
    ADD_RECIPE_SUCCESS,
    GET_RECIPE,
    GET_RECIPE_SUCCESS,
    GET_ALL_RECIPES,
    GET_ALL_RECIPES_SUCCESS,
    DELETE_RECIPE,
    DELETE_RECIPE_SUCCESS
} from './actions';

import { defaultReducers } from './../defaultReducers';

const DEFAULT = defaultReducers.recipes;

export default function recipes(state = DEFAULT, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case ADD_RECIPE:
            return {
                ...state
            }
        case ADD_RECIPE_SUCCESS:
            console.log('REDUCER: ADD_RECIPE_SUCCESS: ');
            state.recipesList = state.recipesList.concat(payload.newRecipe);
            return {
                ...state
            }
        case GET_RECIPE:
            return {
                ...state
            }
        case GET_RECIPE_SUCCESS:
            console.log('REDUCER: GET_RECIPE_SUCCESS');
            const fetchedRecipeList = state.recipesList.filter(recipe => recipe.id === payload.recipeId);
            if(fetchedRecipeList.length > 0){
                state.fetchedRecipe = fetchedRecipeList[0];
            } else {
                state.fetchedRecipe = {};
            }
            return {
                ...state
            }
        case GET_ALL_RECIPES:
            return {
                ...state
            }
        case GET_ALL_RECIPES_SUCCESS:
            state.recipesListApiCall = state.recipesList
            return {
                ...state
            }
        case DELETE_RECIPE:
            return {
                ...state
            }
        case DELETE_RECIPE_SUCCESS:
            const withoutDeletedRecipe = state.recipesList.filter(recipe => recipe.id !== payload.recipeId);
            state.recipesList = withoutDeletedRecipe;
            state.recipesListApiCall = state.recipesList
            return {
                ...state
            }
        default:
            return state;
    }
}