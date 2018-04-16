import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';

import { generateDocs } from 'react-doc-props';

import { documentation } from './PropDemo';

const documentationString = `
import { string, number, shape, arrayOf, setComponentProps } from 'react-doc-props';

export const documentation = {
    name: 'PropDemo',
    description: 'A component with some demo props.',
    props: {
        username: {
            type: string,
            description: 'The users name',
            default: 'Name not set'
        },
        age: {
            type: number,
            description: 'Users age'
        },
        post: {
            description: 'A blog post',
            type: shape.isRequired({
                content: {
                    type: string.isRequired,
                    description: 'The content of the post'
                },
                likes: {
                    type: number.isRequired,
                    description: 'How many people liked the post'
                },
                category: {
                    type: shape({
                        name: {
                            type: string,
                            description: 'The name of the category'
                        },
                        id: {
                            type: number,
                            description: 'The id of the category'
                        }
                    }),
                    description: 'The category of the blog post'
                }
            })
        },
        friends: {
            type: arrayOf({
                description: 'A user',
                type: shape({
                    id: {
                        type: number,
                        description: 'The users id'
                    },
                    name: {
                        type: string,
                        description: 'The users name'
                    }
                })
            }),
            description: 'An array of the users friends',
            default: []
        }
    }
}

setComponentProps(documentation, PropDemo);
`;

const propTypesString = `
import PropTypes from 'prop-types';

PropDemo.propTypes = {
    username: PropTypes.string,
    age: PropTypes.number,
    post: PropTypes.shape({
        content: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        category: PropTypes.shape({
            name: PropTypes.string,
            number: PropTypes.number
        })
    }).isRequired,
    friends: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    )
};

PropDemo.defaultProps = {
    username: 'Name not set',
    friends: []
};
`

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>react-doc-props</h1>
                <p>This documentation object...</p>
                <CodeMirror value={documentationString} options={{
                    mode: 'javascript',
                    readOnly: 'true'
                }} />
                <p>...will generate this JSON...</p>
                <CodeMirror value={JSON.stringify(generateDocs(documentation), null, 4)} options={{
                    mode: 'javascript',
                    readOnly: 'true'
                }} />
                <p>...and is equivalent to the following...</p>
                <CodeMirror value={propTypesString} options={{
                    mode: 'javascript',
                    readOnly: 'true'
                }} />
            </div>
        );
    }
}

export default App
