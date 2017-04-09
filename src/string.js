import PropTypes from 'prop-types';

const getDocs = docs => {
	const type = docs.type();
	return {
		type: type.displayName,
		required: type.required,
		description: docs.description
	}
}

export function string() {
	return {
		displayName: 'String',
		getReactPT: () => PropTypes.string,
		required: false,
		getDocs
	};
}

string.isRequired = function () {
	return {
		displayName: 'String',
		getReactPT: () => PropTypes.string.isRequired,
		required: true,
		getDocs
	};
}