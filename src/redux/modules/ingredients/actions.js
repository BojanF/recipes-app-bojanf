import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const ADD_INGREDIENT = 'ingredient/ADD_INGREDIENT';
export const ADD_INGREDIENT_SUCCESS = 'ingredient/ADD_INGREDIENT_SUCCESS';
export const GET_INGREDIENTS = 'ingredient/GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'ingredient/GET_INGREDIENTS_SUCCESS';

/**
 * Action Creators
 */
export const ingredientsActionCreators = {
  addIngredient: createPromiseAction(ADD_INGREDIENT),
  addIngredientSuccess: createAction(ADD_INGREDIENT_SUCCESS),
  getIngredients: createPromiseAction(GET_INGREDIENTS),
  getIngredientsSuccess: createAction(GET_INGREDIENTS_SUCCESS)
}