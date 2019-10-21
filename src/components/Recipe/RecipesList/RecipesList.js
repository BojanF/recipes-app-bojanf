import React, { Component } from 'react';
import { compose } from 'recompose';
import { connectRecipes } from '../../../redux/modules';
import { promisify } from '../../../utilities';
import DeleteConfirmationModal from '../../DeleteConfirmationModal/DeleteConfirmationModal.js'
const humanizeDuration = require('humanize-duration')
const INSTRUCTIONS_CHAR_LIMIT = 50;

class RecipesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showConfirmModal: false,
            deleteRecipeId: ''
        }
    }

    componentDidMount = () => {
        promisify(this.props.getAllRecipes, {})
            .then(result => {
                console.log('List: ', result);
            })
            .catch(error => {
                console.log('List: ', error);
            });
    }

    deleteRecipe = (recipeId) => {
        console.log('Delete recipe: ', recipeId);
        this.openConfirmModal(recipeId);
    }

    openConfirmModal = (recipeId) => {
        this.setState({
            showConfirmModal: true,
            deleteRecipeId: recipeId
        }); 
    }

    closeConfirmModal = () => {
        this.setState({
            showConfirmModal: false,
            deleteRecipeId: ''
        });
    }

    showInstructions = (instructions) => { 
        if (instructions.length < INSTRUCTIONS_CHAR_LIMIT) {
            return instructions;
        } else {
            //trim the string to the maximum length
            let trimmedString = instructions.substr(0, INSTRUCTIONS_CHAR_LIMIT);

            //re-trim if we are in the middle of a word
            return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))) + '...';
        }
    }

    openRecipeDetails = (recipeId) => {
        console.log('Details: ', recipeId); 
        this.props.history.push(`/recipe-details/${recipeId}`)
    }

    showIngredients = (numberOfIngredients, ingredients) => {
        ingredients = ingredients.map(ing => ing.ingredient);
        if(numberOfIngredients > 3) {
            return ingredients.slice(0, 3).join(', ') + '...'
        } else {
            return ingredients.join(', ')
        }

    }

    render() {
        const { recipes } = this.props;
        const { recipesListApiCall } = recipes;
        
        return (
            <div className="container">

                <h1> List of all ingredients </h1>
                {
                    recipesListApiCall.length === 0 ?
                        (
                            <div className="alert alert-info" role="alert">
                                There are no recipes in the application!
                        </div>
                        )
                        :
                        (
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Source</th>
                                        <th scope="col">Preparation time</th>
                                        <th scope="col">Instructions</th>
                                        <th scope="col">Number of igredients</th>
                                        <th scope="col">Ingredients</th>
                                        <th scope="col">Details</th>
                                        <th scope="col">Delete</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        recipesListApiCall.map(rowItem => (
                                            <tr key={rowItem.id}>
                                                <th scope="row">{rowItem.id}</th>
                                                <td>{rowItem.name}</td>
                                                <td>
                                                    {
                                                        rowItem.source || <span className="badge badge-danger">NOT PROVIDED</span>
                                                    }
                                                </td>
                                                <td> {humanizeDuration(rowItem.preparatinTimeInMilliseconds)} </td>
                                                <td>{this.showInstructions(rowItem.instructions)}</td>
                                                <td>{rowItem.numberOfIngredients}</td>
                                                <td>{this.showIngredients(rowItem.numberOfIngredients, rowItem.ingredients)}</td>
                                                <td> 
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-info btn-sm"
                                                        onClick={() => {this.openRecipeDetails(rowItem.id)}}>
                                                            Details
                                                    </button>
                                                </td>
                                                <th> 
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => {this.deleteRecipe(rowItem.id)}}>
                                                            Delete
                                                    </button>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        )
                }             
                
                <DeleteConfirmationModal 
                    showConfirmModal={this.state.showConfirmModal}
                    deleteRecipeId={this.state.deleteRecipeId}
                    deleteRecipe={this.props.deleteRecipe}
                    closeConfirmModal={this.closeConfirmModal} 
                    closeConfirmModalAfterDelete={this.closeConfirmModal}/>   
            </div>
        )
    }
}

export default compose(
    connectRecipes()
)(RecipesList);