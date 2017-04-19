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
        astring: {
            type: string,
            description: 'Just a string',
            default: 'A default value'
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
                },
                adeepshape: {
                    type: shape({
                        deepstring: {
                            type: string,
                            description: 'A deep string'
                        },
                        deepnumber: {
                            type: number,
                            description: 'A deep number'
                        }
                    }),
                    description: 'A deep shape'
                }
            }),
            description: 'A shape with some required properties.',
            default: {
                aprop: 'stringy',
                anotherprop: 3
            }
        },
        anArrayOf: {
            type: arrayOf(string),
            description: 'An array of strings',
            default: ['a', 'b', 'c']
        }
    }
};

setComponentProps(documentation, PropDemo);

export default PropDemo;