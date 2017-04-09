import PropTypes from 'prop-types';
import { mapObject } from './utils';

const mapToReactPT = mapObject(prop => prop.type().getReactPT());
const mapToDocs = mapObject(prop => prop.type().getDocs(prop));

const getDocs = (docs) => {
	const { displayName, required, shape } = docs.type();
	return {
		type: displayName,
		required,
		description: docs.description,
		shape: mapToDocs(shape)
	};
}

const makeGetReactPT = (required) => (theShape) => {
	const reactPT = PropTypes.shape(mapToReactPT(theShape));

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

export const makeShapeProptype = (required, theShape) => () => ({
	displayName: 'Shape',
	getReactPT: makeGetReactPT(required)(theShape),
	required,
	getDocs,
	shape: theShape
});