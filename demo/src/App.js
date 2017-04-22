import React, { Component } from 'react';

import PropDemo, { documentation } from './PropDemo';
import { DocDisplay } from 'react-doc-props';

class App extends Component {
    render() {
        return (
            <div className="App">
                <DocDisplay documentation={documentation} />
            </div>
        );
    }
}

export default App
