
import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import AddNewRecipe from './../Recipe/AddNewRecipe/AddNewRecipe'
import IngredientsList from './../Ingredient/IngredientsList/IngredientsList'
import AddNewIngredient from './../Ingredient/AddNewIngredient/AddNewIngredient'
import RecipesList from './../Recipe/RecipesList/RecipesList'
import RecipeDetails from './../Recipe/RecipeDetails/RecipeDetails'
import HomeContainer from './../HomeContainer/HomeContainer'
import RecipeNotFound from './../RecipeNotFound/RecipeNotFound'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const uniqid = require('uniqid');

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipesMenuDropdownOpened: false,
      ingredientMenuDropdownOpened: false
    }
  }

  toggleRecipesMenuDropdown = () => {
    this.setState({
      recipesMenuDropdownOpened: !this.state.recipesMenuDropdownOpened,
      ingredientMenuDropdownOpened: false
    });
  }

  toggleIngredientsMenuDropdown = () => {
    this.setState({
      ingredientMenuDropdownOpened: !this.state.ingredientMenuDropdownOpened,
      recipesMenuDropdownOpened: false
    });
  }

  closeMenus = () => {
    this.setState({
      recipesMenuDropdownOpened: false,
      ingredientMenuDropdownOpened: false
    });
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/" onClick={this.closeMenus} >Home</Link>
              </li>
              <li className="nav-item dropdown show">
                <div className="nav-link dropdown-toggle" onClick={this.toggleRecipesMenuDropdown}>
                  Recipes
                </div>
                {
                  this.state.recipesMenuDropdownOpened ?
                  <div className="dropdown-menu show">
                    <Link className="nav-link" to="/view-recipes" onClick={this.toggleRecipesMenuDropdown}>Recipes list</Link>
                    <Link className="nav-link" to="/new-recipe" onClick={this.toggleRecipesMenuDropdown}>Add new</Link>
                  </div> : null
                }
              </li>
              <li className="nav-item dropdown show">
                <div className="nav-link dropdown-toggle" onClick={this.toggleIngredientsMenuDropdown}>
                  Igredients
                </div>
                {
                  this.state.ingredientMenuDropdownOpened ?
                  <div className="dropdown-menu show">
                    <Link className="nav-link" to="/view-ingredients" onClick={this.toggleIngredientsMenuDropdown}>Igredients list</Link>
                    <Link className="nav-link" to="/new-ingredient" onClick={this.toggleIngredientsMenuDropdown}>Add new</Link>
                  </div> : null
                }
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/recipe-not-found" component={RecipeNotFound} />
          <Route exact path="/view-ingredients" component={IngredientsList} />
          <Route exact path="/new-ingredient" component={AddNewIngredient} />
          <Route exact path="/recipe-details/:recipeId" component={RecipeDetails} />
          <Route exact path="/view-recipes" component={RecipesList} />
          <Route exact path="/new-recipe" component={AddNewRecipe} />
          <Route path="/" component={HomeContainer}/>
        </Switch>
        
      </div>
    )
  }
}


export default App;
