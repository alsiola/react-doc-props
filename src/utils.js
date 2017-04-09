export const mapObject = (mapper) => (object) => Object.keys(object).reduce((output, key) => {
	output[key] = mapper(object[key]);
	return output;
}, {});