const ingredients = {
  ingredientsList: [
    {
      id: 'k1z2s313',
      name: 'Flour',
      measure: 'grams'
    },
    {
      id: 'k1z2s314',
      name: 'Milk',
      measure: 'ml'
    },
    {
      id: 'k1z2s315',
      name: 'Oil',
      measure: 'ml'
    },
    {
      id: 'k1z2s316',
      name: 'Salt',
      measure: 'grams'
    },
    {
      id: 'k1z2s317',
      name: 'Sugar',
      measure: 'grams'
    },
    {
      id: 'k1z2s318',
      name: 'Eggs',
      measure: 'piece'
    },
    {
      id: 'k1z2s319',
      name: 'Tomatos',
      measure: 'grams'
    },
    {
      id: 'k1z2s31a',
      name: 'Peppers',
      measure: 'piece'
    },
    {
      id: 'k1z2s31b',
      name: 'Cheese',
      measure: 'grams'
    },
    {
      id: 'k1z2s31c',
      name: 'Potatoes',
      measure: 'grams'
    },
    {
      id: 'k1z2s31d',
      name: 'Meat',
      measure: 'grams'
    }
  ],
  ingredientsListApiCall: []
}

const recipes = {
  recipesList: [
    {
      id: "k1zeo9jz",
      instructions: "It`s a secret",
      name: "Pancakes",
      numberOfIngredients: 4,
      ingredients: [
        {
          ingredient: 'Flour',
          quantity: 500,
          measure: 'grams'
        },
        {
          ingredient: 'Eggs',
          quantity: 4,
          measure: 'piece'
        },
        {
          ingredient: 'Milk',
          quantity: 1000,
          measure: 'ml'
        },
        {
          ingredient: 'Oil',
          quantity: 50,
          measure: 'ml'
        }
      ],
      preparatinTimeInMilliseconds: 4500000,
      source: "Mom"
    },
    {
      id: "k20j5lhd",
      instructions: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
      name: "Fritata",
      numberOfIngredients: 2,
      ingredients: [        
        {
          ingredient: 'Eggs',
          quantity: 4,
          measure: 'piece'
        },
        {
          ingredient: 'Peppers',
          quantity: 2,
          measure: 'piece'
        }
      ],
      preparatinTimeInMilliseconds: 8100000,
      source: "Mom"
    }
  ],
  recipesListApiCall: [],
  fetchedRecipe: {}
}

export const defaultReducers = {
  ingredients,
  recipes
}
