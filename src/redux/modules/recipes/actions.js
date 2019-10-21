import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const ADD_RECIPE = 'recipe/ADD_RECIPE';
export const ADD_RECIPE_SUCCESS = 'recipe/ADD_RECIPE_SUCCESS';
export const GET_RECIPE = 'recipe/GET_RECIPE'
export const GET_RECIPE_SUCCESS = 'recipe/GET_RECIPE_SUCCESS'
export const GET_ALL_RECIPES = 'recipe/GET_ALL_RECIPES';
export const GET_ALL_RECIPES_SUCCESS = 'recipe/GET_ALL_RECIPES_SUCCESS';
export const DELETE_RECIPE = 'recipe/DELETE_RECIPE';
export const DELETE_RECIPE_SUCCESS = 'recipe/DELETE_RECIPE_SUCCESS';

/**
 * Action Creators
 */
export const recipesActionCreators = {
  addRecipe: createPromiseAction(ADD_RECIPE),
  addRecipeSuccess: createAction(ADD_RECIPE_SUCCESS),
  getRecipe: createPromiseAction(GET_RECIPE),
  getRecipeSuccess: createAction(GET_RECIPE_SUCCESS),
  getAllRecipes: createPromiseAction(GET_ALL_RECIPES),
  getAllRecipesSuccess: createAction(GET_ALL_RECIPES_SUCCESS),
  deleteRecipe: createPromiseAction(DELETE_RECIPE),
  deleteRecipeSuccess: createAction(DELETE_RECIPE_SUCCESS)
}