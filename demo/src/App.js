import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PropDemo, { documentation } from './PropDemo';
import DocDisplay from './DocDisplay';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to React Doc Props</h2>
                </div>
                <div className="App-intro">
                    <PropDemo />
                    <DocDisplay documentation={documentation} />
                </div>
            </div>
        );
    }
}

export default App
