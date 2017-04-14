import PropTypes from 'prop-types';
import { mapToDocs, mapToReactPT } from './utils';

const getArrayOfDoc = (theType) => {
	if ('type' in theType) {
		return theType.type().getDocs(theType);
	}

	const { getDocs, getReactPT, getOneOfTypeDescription, displayName, required, shape, arrayOf, ...rest } = theType();
	return {
		type: displayName,
		required,
		...rest
	}
}

// takes a shape docs-prop and converts it to a documentation object
const getDocs = (theType) => (prop) => {
	const { displayName, required, description, arrayOf } = prop.type();

	return {
		type: displayName,
		required,
		description: prop.description,
		arrayOf: getArrayOfDoc(theType)
	};
}

// takes a doc-props shape object and returns the react proptype for that shape
const makeGetReactPT = (required) => (theType) => {
	const arrayOfType = 'type' in theType ? theType.type().getReactPT() : theType().getReactPT();
	const reactPT = PropTypes.arrayOf(arrayOfType);

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

const typeToName = (theType) => {
	if ('type' in theType) {
		return theType.type().displayName;
	}
	return theType().displayName;
};


// makes a doc-props arrayOf proptype
export const makeArrayOfProptype = (required, theType) => () => ({
	displayName: `Array of type ${typeToName(theType)}`,
	getReactPT: makeGetReactPT(required)(theType),
	required,
	getDocs: getDocs(theType),
	arrayOf: theType
});