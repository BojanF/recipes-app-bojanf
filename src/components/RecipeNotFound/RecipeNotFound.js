import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


class RecipeNotFound extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        userId: PropTypes.string,
      }),
    }).isRequired,
  };

  render() {
    return (
      <div className="App">
        <div className="container">
            <div className="m-4">
                <div className="sign-up-content login">
                    <div className="alert alert-danger" role="alert">
                        Wanted recipe does not exist !!!
                    </div>
                    <NavLink to="/">Return to Home Page</NavLink>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default RecipeNotFound;