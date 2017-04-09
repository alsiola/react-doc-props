const getDocs = (docs) => {
	const { displayName, required } = docs.type();
	return {
		type: displayName,
		required,
		description: docs.description
	}
}

export const makeSimplePropType = (displayName, reactPT, required = false) => ({
	displayName,
	required,
	getReactPT: () => reactPT,
	getDocs
});