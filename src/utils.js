const mapObject = (mapper) => (object) => Object.keys(object).reduce((output, key) => {
	output[key] = mapper(object[key]);
	return output;
}, {});


export const mapToReactPT = mapObject(prop => prop.type().getReactPT());
export const mapToDocs = mapObject(prop => prop.type().getDocs(prop));