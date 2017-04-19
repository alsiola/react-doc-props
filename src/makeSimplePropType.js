// takes a docs-prop object and returns a documentation object
const getDocs = (prop) => {
	const { displayName, required } = prop.type();
	return {
		type: displayName,
		required,
		description: prop.description,
        default: prop.default
	}
}

// makes a simple docs-prop type
export const makeSimplePropType = (displayName, reactPT, required = false) => ({
	displayName,
	required,
	getReactPT: () => reactPT,
	getDocs,
	getOneOfTypeDescription: () => ({
		type: displayName
	})
});