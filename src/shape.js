import PropTypes from 'prop-types';
import { mapToDocs, mapToReactPT, mapToOneOfTypeDescription } from './utils';

// takes a shape docs-prop and converts it to a documentation object
const getDocs = (prop) => {
	const { displayName, required, shape } = prop.type();
	return {
		type: displayName,
		required,
        description: prop.description,
        default: prop.default,
		shape: mapToDocs(shape)
	};
}

// takes a doc-props shape object and returns the react proptype for that shape
const makeGetReactPT = (required) => (theShape) => {
	const reactPT = PropTypes.shape(mapToReactPT(theShape));

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

// makes a doc-props shape proptype
export const makeShapeProptype = (required, theShape) => () => ({
	displayName: 'Shape',
	getReactPT: makeGetReactPT(required)(theShape),
	required,
	getDocs,
	shape: theShape,
	getOneOfTypeDescription: () => ({
		type: 'Shape',
		shape: mapToOneOfTypeDescription(theShape)
	})
});