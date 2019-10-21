import React, { Component } from 'react';
import { compose } from 'recompose';
import { connectRecipes, connectIngredients } from '../../../redux/modules';
import { promisify } from '../../../utilities';
import './AddNewRecipe.css';
const uniqid = require('uniqid');

class AddNewRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            nameNotValid: false,            
            source: '',
            instructions: '',
            instructionsNotValid: false,
            hours: '',
            minutes: '',
            minutesNotValid: false,
            info: '',
            success: '',
            error: '',
            ingredients: [{ingredient: "", quantity: ""}],
            ingredientsNotValid: false
        }
    }

    handleInputChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount = () => {
        promisify(this.props.getIngredients, {})
            .then(result => {
                console.log('List: ', result);
            })
            .catch(error => {
                console.log('List: ', error);
            });
    }

    ingredientsNotValid = () => {
        const { ingredients } = this.state;
        const validated = ingredients.filter(ing => ing.ingredient !== '' && ing.quantity !== '');
        
        if(validated.length === 0) {
            this.setState({
                ingredientsNotValid: true
            });
            return true;
        } else {
            this.setState({
                ingredientsNotValid: false
            });
            return false;
        }
        
    }

    validate = () => {
        const { name, instructions, minutes } = this.state;
        let validForm = true;
        const ingredientsValidation = this.ingredientsNotValid();
        if(name=== '' || instructions==='' || minutes=== '' || ingredientsValidation) {
            validForm = false;
            let nameNotValid, instructionsNotValid, minutesNotValid = false;
            if(name === ''){
                nameNotValid = true;
            }
            if(instructions === ''){
                instructionsNotValid = true;
            }
            if(minutes === ''){
                minutesNotValid = true;
            }

            this.setState({
                nameNotValid,
                instructionsNotValid,
                minutesNotValid
            });

        }

        return validForm;
        
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if(!this.validate())
            return

        this.setState({
            nameNotValid: false,
            instructionsNotValid: false,
            ingredientsNotValid: false,
            minutesNotValid: false
        });

        
        const { name, source, instructions, hours, minutes, ingredients } = this.state;
        const totalPrepTimeMs = (Number(hours) * 60 + Number(minutes)) * 60000;
        
        const ingredientsFinal = ingredients.filter(ing => ing.ingredient !== '' && ing.quantity !== '').map(ing => {
            const split = ing.ingredient.split(' - ');

            return {
                ingredient: split[0],
                measure: split[1],
                quantity: ing.quantity
            }
        })
        const newRecipe = {
            id: uniqid(),
            name,
            source,
            instructions,
            numberOfIngredients: ingredientsFinal.length,
            ingredients: ingredientsFinal,
            preparatinTimeInMilliseconds: totalPrepTimeMs
        };

        this.setState({
            info: 'Saving...'
        })
        
        promisify(this.props.addRecipe, { newRecipe })
            .then(result => {
                this.setState({
                    info: '',
                    success: 'Successfully save recipe'
                }, () => setTimeout(() => {
                    this.setState({
                        success: '',
                        name: '',
                        source: '',
                        instructions: '',
                        hours,
                        minutes,
                    });
                    this.props.history.push(`/view-recipes`)
                }, 2000))

            })
            .catch(error => {
                console.log('ERROR: ', error);
                this.setState({
                    info: '',
                    error: 'Recipe is not saved'
                }, () => setTimeout(() => {
                    this.setState({ error: '' })
                }, 1500))
            })

    }

    createUI() {
        const { ingredients } = this.props;
        const { ingredientsList } = ingredients;
        return this.state.ingredients.map((el, i) => (
            <div className="row" key={i}>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="name">Ingredient</label>
                        <select                             
                            onChange={this.handleIngredientChange.bind(this, i)}
                            className="custom-select"
                            name="ingredient">
                            <option>--None--</option>
                            {
                                ingredientsList.map(item => (
                                    <option 
                                        key={item.id} 
                                        value={item.name + ' - ' + item.measure}>
                                            { item.name + ' - ' + item.measure }
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="name">Quantity</label>
                        <input 
                            className="form-control"
                            type='number' 
                            min='0'
                            placeholder="Quantity" 
                            name="quantity" 
                            value={el.quantity || ''} 
                            onChange={this.handleIngredientChange.bind(this, i)} />
                    </div>
                </div>
                <div className="col-4">
                    <div className="form-group">
                        <label htmlFor="name">Action</label> <br/>
                        <button  type="button" className="btn btn-danger btn" onClick={this.removeClick.bind(this, i)}> Remove </button> 
                    </div>
                </div>
            </div>
        ))
    }

    addClick() {
        this.setState(prevState => ({
            ingredients: [...prevState.ingredients, { ingredient: "", quantity: "" }]
        }))
    }

    handleIngredientChange(i, e) {
        const { name, value } = e.target;
        let ingredients = [...this.state.ingredients];
        ingredients[i] = { ...ingredients[i], [name]: value };
        this.setState({ ingredients });
    }

    removeClick(i) {
        let ingredients = [...this.state.ingredients];
        if(ingredients.length > 1) {
            ingredients.splice(i, 1);
            this.setState({ ingredients });
        }
    }    

    render() {
        const { 
            info, 
            success, 
            error, 
            nameNotValid, 
            minutesNotValid, 
            instructionsNotValid, 
            ingredientsNotValid 
        } = this.state;

        return (
            <div className="container">
                <h1> Add new recipe </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className='col'>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.name}
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    onChange={this.handleInputChange} /> 
                                { nameNotValid && <div className="invalid-feedback"> Please provide name </div> }
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-group">
                                <label htmlFor="recipe-source">Source</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.source}
                                    id="recipe-source"
                                    name="source"
                                    placeholder="Recipe source"
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                    </div>
                    
                    { this.createUI() }        
                        
                    <div className="row">                        
                        <div className="col-3 form-group">
                            { ingredientsNotValid && <div className="invalid-feedback"> Enter at least one ingredient </div> }
                            <button type='button' className="btn btn-success btn-sm"onClick={this.addClick.bind(this)}> Add another ingredient</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2">
                            <div> Preparation time </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Hours</span>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    value={this.state.hours}
                                    className="form-control"
                                    placeholder="Hours"
                                    name="hours"
                                    onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Minutes</span>
                                </div>
                                <input
                                    type="number"
                                    min="0"
                                    value={this.state.minutes}
                                    className="form-control"
                                    placeholder="Minutes"
                                    name="minutes"
                                    onChange={this.handleInputChange} />
                                { minutesNotValid && <div className="invalid-feedback"> Provide at least minutes </div> }
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="form-group">
                                <label htmlFor="instructions-textarea">Instructions</label>
                                <textarea
                                    name="instructions"
                                    className="form-control"
                                    placeholder="Instructions for preparing the recipe..."
                                    id="instructions-textarea"
                                    rows="3"
                                    value={this.state.instructions}
                                    onChange={this.handleInputChange}
                                />
                                { instructionsNotValid && <div className="invalid-feedback"> You have to provide instructions </div> }
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Save recipe</button>
                </form>
                <div className="m-4">
                    {
                        success &&
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    }
                    {
                        error &&
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default compose(
    connectRecipes(),
    connectIngredients()
)(AddNewRecipe);