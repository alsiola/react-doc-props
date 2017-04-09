import PropTypes from 'prop-types';

const getDocs = docs => {
	const type = docs.type();
	return {
		type: type.displayName,
		required: type.required,
		description: docs.description,
		shape: Object.keys(type.shape).reduce((output, key) => {
			output[key] = type.shape[key].type().getDocs(type.shape[key]);
			return output;
		}, {})
	}
}

const makeGetReactPT = (required) => (theShape) => {
	const reactPT = PropTypes.shape(Object.keys(theShape).reduce((outputShape, key) => {
		outputShape[key] = theShape[key].type().getReactPT();
		return outputShape;
	}, {}));

	return () => {
		if (required) return reactPT.isRequired;
		return reactPT;
	}
};

export function shape(theShape) {
	return () => ({
		displayName: 'Shape',
		getReactPT: makeGetReactPT(false)(theShape),
		required: false,
		getDocs,
		shape: theShape
	});
}

shape.isRequired = function (theShape) {
	return () => ({
		displayName: 'Shape',
		getReactPT: makeGetReactPT(true)(theShape),
		required: true,
		getDocs,
		shape: theShape
	});
}