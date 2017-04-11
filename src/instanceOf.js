import PropTypes from 'prop-types';
import { mapToDocs, mapToReactPT } from './utils';

// takes a shape docs-prop and converts it to a documentation object
const getDocs = (prop) => {
	const { displayName, required, shape } = prop.type();
	return {
		type: displayName,
		required,
		description: prop.description
	};
}

// takes a doc-props shape object and returns the react proptype for that shape
const makeGetReactPT = (required) => (theType) => {
	const reactPT = PropTypes.instanceOf(theType);

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

const getTypeName = (theType) => {
	var funcNameRegex = /function (.{1,})\(/;
	var results = (funcNameRegex).exec(theType.constructor.toString());
	return (results && results.length > 1) ? results[1] : "Unknown type";
}


// makes a doc-props shape proptype
export const makeInstanceOfProptype = (required, theType, typeName) => () => ({
	displayName: `Instance Of ${typeName || getTypeName(theType)}`,
	getReactPT: makeGetReactPT(required)(theType),
	required,
	getDocs
});