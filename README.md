# react-doc-props

react-doc-props is a package that allows you to write comprehensive in-file documentation of React components.  This documentation will then generate the correct propTypes and defaultProps for your component.  Additionally, a `DocDisplay` component is provided that will display the documentation in a human-friendly format, which can be integrated with, for example, React-Storybook.

Installation
=======
Install with your package manager of choice:
````
npm install --save react-doc-props
````

Usage
=====
The basic react-doc-props documentation object looks like this:
````
const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        // a object of props keyed by propName - see below
    }
};
````

This documentation object is then converted to the appropriate propTypes and defaultProps objects, and applied to the component with the `setComponentProps` function:
````
import { setComponentProps } from 'react-doc-props';

setComponentProps(documentation, Component);
````

Simple Prop Types
-----
The `documentation.props` object is constructed using the propTypes exported by react-prop-docs:
````
import { string } from 'react-doc-props';
````

Which are then used in the documentation object:
````
const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        title: {
            type: string,
            description: 'The title of the component',
            default: 'A default title'
        }
    }
};
````

If a prop is required then, as with the React PropTypes, just add `.isRequired`:
````
const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        title: {
            type: string.isRequired,
            description: 'The title of the component',
            default: 'A default title'
        }
    }
};
````

The simple propTypes are all used in the same way, and all of the React PropTypes are available:
````
import { string, number, boolean, object, func, array, symbol, element, node, any } from 'react-doc-props';
````

Shape
=====
A shape propType is created by using the `shape` function from `react-doc-props`.  The shape required is passed as an argument - this argument should be an object with the same structure as the `documentation.props` object:
````
import { shape, string, number } from 'react-doc-props';

const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        user: {
            type: shape({
                name: {
                    type: string,
                    description: 'The users name'
                },
                age: {
                    type: number,
                    description: 'The users age in years'
                }
            }),
            description: 'The current user',
            default: {
                name: 'No name set',
                age: -1
            }
        }
    }
};
````

If a shape is required, then `shape.isRequired()` can be used:
````
import { shape, string, number } from 'react-doc-props';

const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        user: {
            type: shape.isRequired({
                name: {
                    type: string,
                    description: 'The users name'
                },
                age: {
                    type: number,
                    description: 'The users age in years'
                }
            }),
            description: 'The current user'
        }
    }
};
````

InstanceOf
--------
An instanceOf propType is created with the `instanceOf` function from `react-doc-props`.  It takes two arguments: the class the prop must be an instance of, and optionally a display name for that class.
````
import { instanceOf } from 'react-doc-props';

const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        loginMsg: {
            type: instanceOf(Message, 'Message'),
            description: 'A message about login.'
        }
    }
};
````

If the prop is required, then use the `instanceOf.isRequired()` function.

ArrayOf and ObjectOf
---------
ArrayOf and ObjectOf work in the same way, using `arrayOf` and `objectOf` respectively:
````
import { arrayOf, objectOf, string } from 'react-doc-props';

const documentation = {
    name: 'ComponentName',
    description: 'A description of the component',
    props: {
        names: {
            type: arrayOf(string),
            description: 'An array of user names.'
        },
        languages: {
            type: objectOf(string),
            description: 'The preferred language of a user keyed by user name'
        }
    }
};
````
Again, substitute with `arrayOf.isRequired` or `objectOf.isRequired` for required props.
