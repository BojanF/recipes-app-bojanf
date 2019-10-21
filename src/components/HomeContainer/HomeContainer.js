import React, { Component } from 'react';
import logo from './../../logo.svg';

class HomeContainer extends Component {
    render() {
        return (
            <div className="App">                
                <h1> Welcome to Recipies App </h1>
                <h2> React and Redux application made by Bojan Filipovski </h2>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        )
    }
}

export default HomeContainer;