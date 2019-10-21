import React, { Component } from 'react';
import { compose } from 'recompose';
import { connectIngredients } from '../../../redux/modules';
import { promisify } from '../../../utilities';
import './AddNewIngredient.css';
const uniqid = require('uniqid');

class AddNewIngredient extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ingredient: '',
            measure: '',            
            ingredientNotValid: false,
            measureNotValid: false,
            info: '',
            success: '',
            error: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.validate())
            return;

        this.setState({
            ingredientNotValid: false,
            measureNotValid: false
        });

        console.log('submit');

        const { measure, ingredient } = this.state;
        const newIngredient = {
            id: uniqid(),
            name: ingredient,
            measure
        }

        promisify(this.props.addIngredient, { newIngredient })
            .then(result => {
                this.setState({
                    info: '',
                    success: 'Successfully saved engredient'
                }, () => setTimeout(() => {
                    this.setState({
                        success: '',
                        name: ''                        
                    });
                    this.props.history.push(`/view-ingredients`)
                }, 2000))

            })
            .catch(error => {
                console.log('ERROR: ', error);
                this.setState({
                    info: '',
                    error: 'Engredient is not saved'
                }, () => setTimeout(() => {
                    this.setState({ error: '' })
                }, 1500))
            })
    }

    handleInputChange = (event) => {
        const { target } = event;
        const { name, value } = target;
        this.setState({
            [name]: value
        });
    }

    validate = () => {
        const { ingredient, measure } = this.state;
        let validForm = true;
        if(ingredient=== '' || measure=== '') {
            validForm = false;
            let ingredientNotValid, measureNotValid = false;
            if(ingredient === ''){
                ingredientNotValid = true;
            }
            if(measure === ''){
                measureNotValid = true;
            }

            this.setState({
                ingredientNotValid,
                measureNotValid
            });

        }
        return validForm;        
    }

    render() {
        const { ingredientNotValid, measureNotValid, success, error } = this.state;
        return (
            <div className="container">
                <h1> Add new ingredient </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className='col'>
                            <div className="form-group">                                
                                <label htmlFor="ingredient">Ingredient</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.ingredient}
                                    id="ingredient"
                                    name="ingredient"
                                    placeholder="Ingredient name"
                                    onChange={this.handleInputChange} />
                                { ingredientNotValid && <div className="invalid-feedback"> Please chose measure </div> }
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Measure</label>
                                <select
                                    className="custom-select"    
                                    name="measure"                                
                                    onChange={this.handleInputChange} >
                                    <option> --None-- </option>
                                    <option value='grams'> grams </option>
                                    <option value='ml'> ml </option>
                                    <option value='piece'> piece </option>
                                </select>
                                { measureNotValid && <div className="invalid-feedback"> Please chose measure </div> }
                            </div>
                        </div>                        
                    </div>
                    <button type="submit" className="btn btn-primary">Add new ingredient</button>
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
    connectIngredients()
)(AddNewIngredient);