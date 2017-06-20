export const mapObject = (mapper) => (object) => Object.keys(object).reduce((output, key) => {
	output[key] = mapper(object[key]);
	return output;
}, {});

export const objectToArray = (keyProp, valProp) => (object) => Object.keys(object).map(key => ({
    [keyProp]: key,
    [valProp]: object[key]
}));


export const mapToReactPT = mapObject(prop => prop.type().getReactPT());
export const mapToDefaults = mapObject(prop => prop.default);
export const mapToDocs = mapObject(prop => prop.type().getDocs(prop));


export const objectToArrayNameDocs = objectToArray('name', 'docs');

export const propsToDocs = (props) => objectToArrayNameDocs(mapToDocs(props));

export const shapeToDocs = (shape) => objectToArrayNameDocs(shape);

export const arrayOfToDocs = (arrayOf) => ({
    name: '',
    docs: arrayOf
});


export const display = (value) => {
    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }
    if (Array.isArray(value)) {
        return `[ ${value.map(v => display(v)).join(', ')} ]`;
    }
    return value;
}

export const mapToOneOfTypeDescription = mapObject(prop => {
	const { type, description } = prop.type(prop).getDocs(prop);
	return {
		type,
		description
	}
});

export const ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';