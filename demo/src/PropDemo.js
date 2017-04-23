import React from 'react';
import { string, number, shape, arrayOf, setComponentProps } from 'react-doc-props';

const PropDemo = ({ astring, anumber, ashape, anArrayOf }) => (
    <div>
        Just a component with some autodocumented props.<br />
        The default string is set to {astring}.
    </div>
);

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
            }),
            description: 'A blog post'
        },
        friends: {
            type: arrayOf({
                type: shape({
                    id : {
                        type: number,
                        description: 'The users id'
                    },
                    name: {
                        type: string,
                        description: 'The users name'
                    }
                }),
                description: 'A user'
            }),
            description: 'An array of the users friends',
            default: []
        }
    }
};

setComponentProps(documentation, PropDemo);

export default PropDemo;