import React, { Component } from 'react';
import { compose } from 'recompose';
import { connectIngredients } from '../../../redux/modules';
import { promisify } from '../../../utilities';

class IngredientsList extends Component {

    constructor(props) {
        super(props);
        console.log('PP: ', this.props);
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

    render() {
        const { ingredients } = this.props;
        const { ingredientsListApiCall } = ingredients;
        return (
            <div className="App">
                <div className="container">
                    <h1> List of all ingredients </h1>
                    {
                        ingredientsListApiCall.length === 0 ?

                            (
                                <div className="alert alert-info" role="alert">
                                    There are no ingredients in the application!
                                </div>
                            )
                            :
                            (
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Measure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ingredientsListApiCall.map(rowItem => (
                                                <tr key={rowItem.id}>
                                                    <th scope="row">{rowItem.id}</th>
                                                    <td>{rowItem.name}</td>
                                                    <td>{rowItem.measure}</td>
                                                </tr>                                                
                                            ))
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default compose(
    connectIngredients()
)(IngredientsList);