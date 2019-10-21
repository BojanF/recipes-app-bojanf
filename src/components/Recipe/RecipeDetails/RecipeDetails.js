import React, { Component } from 'react';
import { compose } from 'recompose';
import { connectRecipes } from '../../../redux/modules';
import { promisify } from '../../../utilities';
import DeleteConfirmationModal from '../../DeleteConfirmationModal/DeleteConfirmationModal.js'
const humanizeDuration = require('humanize-duration')

class RecipeDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipeId: ''
        }
    }

    componentDidMount = () => {

        const recipeId = this.props.match.params.recipeId;

        if (recipeId === '') {
            this.props.history.push(`/recipe-not-found/`);
        } else {
            promisify(this.props.getRecipe, { recipeId })
                .then(result => {
                    if (!this.props.recipes.fetchedRecipe.id) {
                        this.props.history.push(`/recipe-not-found/`);
                    }
                })
                .catch(error => {
                    console.log('ERROR: ', error);
                })
        }
    }    

    deleteRecipe = (recipeId) => {
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

    closeConfirmModalAfterDelete = () => {
        this.closeConfirmModal();
        this.props.history.push(`/view-recipes`);
    }

    showIngredients = (ingredients) => {
        return ingredients.map((item, key) =>
            <li key={key}> {item.ingredient + ' - ' + item.quantity + ' ' + item.measure} </li>
        );
    }

    render() {
        const { recipes } = this.props;
        const { fetchedRecipe } = recipes;
        return (
            <div className="container">
                {
                    fetchedRecipe.id &&
                    <div>
                        <h1> Recipe details </h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Column</th>
                                    <th scope="col">Detailst</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{fetchedRecipe.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Source</th>
                                    <td>
                                        {
                                            fetchedRecipe.source || <span className="badge badge-danger">NOT PROVIDED</span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Ingredients</th>
                                    <td>                                        
                                        <ul>
                                            {this.showIngredients(fetchedRecipe.ingredients)}
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Instructions</th>
                                    <td> { fetchedRecipe.instructions } </td>
                                </tr>
                                <tr>
                                    <th scope="row">Preparation time</th>
                                    <td>{humanizeDuration(fetchedRecipe.preparatinTimeInMilliseconds)}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Delete</th>
                                    <td>
                                        <button 
                                            type="button" 
                                            className="btn btn-danger btn-xs"
                                            onClick={() => {this.deleteRecipe(fetchedRecipe.id)}}>
                                                Delete
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
                <DeleteConfirmationModal 
                    showConfirmModal={this.state.showConfirmModal}
                    deleteRecipeId={this.state.deleteRecipeId}
                    deleteRecipe={this.props.deleteRecipe}
                    closeConfirmModal={this.closeConfirmModal}
                    closeConfirmModalAfterDelete={this.closeConfirmModalAfterDelete}/> 
            </div>
        )
    }


}

export default compose(
    connectRecipes()
)(RecipeDetails);
