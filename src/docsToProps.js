const getBasePropType = (propObj) => {
	return propObj.type().reactPT;
}

const getPropType = (propObj) => {
	const reactPT = getBasePropType(propObj);
	return propObj.required ? reactPT.isRequired : reactPT;
}

const getShape = (shape) => {
	return Object.keys(shape).reduce((outputShape, key) => {
		outputShape.key = getPropType(shape[key]);
		return outputShape;
	}, {});
};

const docsToProps = (docs) => {
	return Object.keys(docs.props).reduce((propTypes, key) => {
		propTypes[key] = getPropType(docs.props[key]);
		return propTypes;
	}, {});
};