import PropTypes from 'prop-types';
import { mapToDocs, mapToReactPT } from './utils';

// takes a shape docs-prop and converts it to a documentation object
const getDocs = (theTypes) => (prop) => {
	const { displayName, required } = prop.type();
	return {
		type: displayName,
		required,
        description: prop.description,
        default: prop.default,
		types: theTypes.map(type => type().getOneOfTypeDescription())
	};
}

// takes a doc-props shape object and returns the react proptype for that shape
const makeGetReactPT = (required) => (theTypes) => {
	const reactPT = PropTypes.oneOfType(theTypes.map(type => (
		type().getReactPT()
	)));

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

const typesToName = (theTypes) => {
	return theTypes.map(type => ' ' + type().displayName).join().trim();
};


// makes a doc-props oneOfType proptype
export const makeOneOfTypeProptype = (required, theTypes) => () => ({
	displayName: `One of type [${typesToName(theTypes)}]`,
	getReactPT: makeGetReactPT(required)(theTypes),
	required,
	getDocs: getDocs(theTypes)
});