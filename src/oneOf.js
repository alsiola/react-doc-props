import PropTypes from 'prop-types';
import { mapToDocs, mapToReactPT } from './utils';

// takes a shape docs-prop and converts it to a documentation object
const getDocs = (prop) => {
	const { displayName, required } = prop.type();
	return {
		type: displayName,
		required,
		description: prop.description
	};
}

// takes a doc-props shape object and returns the react proptype for that shape
const makeGetReactPT = (required) => (theEnum) => {
	const reactPT = PropTypes.oneOf(theEnum);

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

const enumToName = (theEnum) => {
	return theEnum.map(item => ' ' + item ).join().trim();
};


// makes a doc-props shape proptype
export const makeOneOfProptype = (required, theEnum) => () => ({
	displayName: `One of [${enumToName(theEnum)}]`,
	getReactPT: makeGetReactPT(required)(theEnum),
	required,
	getDocs
});