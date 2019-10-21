import {
    ADD_INGREDIENT,
    ADD_INGREDIENT_SUCCESS,
    GET_INGREDIENTS,
    GET_INGREDIENTS_SUCCESS
} from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.ingredients;

export default function ingredients(state = DEFAULT, action = {}) {
    const { type, payload } = action;

    switch (type) {
        case ADD_INGREDIENT:
            console.log('R: ADD_INGREDIENT');
            return {
                ...state
            }
        case ADD_INGREDIENT_SUCCESS:
            console.log('R: ADD_INGREDIENT_SUCCESS: ');
            state.ingredientsList = state.ingredientsList.concat(payload.newIngredient);
            return {
                ...state
            }
        case GET_INGREDIENTS:
            console.log('GET_INGREDIENTS');
            return {
                ...state
            }
        case GET_INGREDIENTS_SUCCESS:
            console.log('GET_INGREDIENTS_SUCCESS');
            state.ingredientsListApiCall = state.ingredientsList;
            return {
                ...state
            }
        default:
            return state;
    }
}