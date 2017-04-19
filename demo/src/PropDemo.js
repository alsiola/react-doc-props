import React from 'react';
import { string, number, shape, arrayOf, docsToProps } from 'react-doc-props';

const PropDemo = ({ astring, anumber, ashape, anArrayOf }) => (
    <div>
        Just a component with some autodocumented props.
    </div>
);

export const documentation = {
    name: 'PropDemo',
    description: 'A component with some demo props.',
    props: {
        astring: {
            type: string,
            description: 'Just a string'
        },
        anumber: {
            type: number,
            description: 'Just a number'
        },
        ashape: {
            type: shape({
                aprop: {
                    type: string.isRequired,
                    description: 'A string in a shape'
                },
                anotherprop: {
                    type: number.isRequired,
                    description: 'A number in a shape'
                }
            }),
            description: 'A shape with some required properties.'
        },
        anArrayOf: {
            type: arrayOf(string),
            description: 'An array of strings'
        }
    }
};

PropDemo.propTypes = docsToProps(documentation);

export default PropDemo;