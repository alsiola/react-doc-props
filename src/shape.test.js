import { shape, string } from './index';
import ReactPropTypes from 'prop-types';
import { ReactPropTypesSecret } from './utils';

const dummyProps = {
	ashape: {
		astring: 'hello',
		anumber: 3
	},
	anumber: 3
}

const testShape = {
	astring: {
		type: string,
		description: 'A string'
	}
};

const reactTestShape = {
	astring: ReactPropTypes.string
};

describe('shape', () => {
	test('returns correct displayName', () => {
		const { displayName } = shape(testShape)();

		expect(displayName).toEqual('Shape');
	});

	test('returns correct required value', () => {
		const isRequired = shape.isRequired(testShape)().required;
		const notRequired = shape(testShape)().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = shape(testShape)();
		const reactPT = getReactPT();
		expect(reactPT(dummyProps, 'ashape', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape)(dummyProps, 'ashape', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape)(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape)(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = shape.isRequired(testShape)();
		const reactPT = getReactPT();

		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape).isRequired(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape).isRequired(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(ReactPropTypes.shape(reactTestShape).isRequired(dummyProps, 'anumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = shape(testShape)();

		const prop = {
			type: shape(testShape),
			description: 'A shape'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Shape',
			required: false,
			description: 'A shape',
			shape: {
				astring: {
					type: 'String',
					required: false,
					description: 'A string'
				}
			}
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = shape(testShape)();

		const prop = {
			type: shape.isRequired(testShape),
			description: 'A shape'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Shape',
			required: true,
			description: 'A shape',
			shape: {
				astring: {
					type: 'String',
					required: false,
					description: 'A string'
				}
			}
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object with deep shape', () => {
		const deepShape = {
			astring: {
				type: string,
				description: 'A string'
			},
			adeepshape: {
				type: shape({
					adeepstring: {
						type: string,
						description: 'A deep string'
					}
				}),
				description: 'A deep shape'
			}
		};
		
		const { getDocs } = shape(deepShape)();

		const prop = {
			type: shape.isRequired(deepShape),
			description: 'A shape'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Shape',
			required: true,
			description: 'A shape',
			shape: {
				astring: {
					type: 'String',
					required: false,
					description: 'A string'
				},
				adeepshape: {
					type: 'Shape',
					required: false,
					description: 'A deep shape',
					shape: {
						adeepstring: {
							type: 'String',
							required: false,
							description: 'A deep string'
						}
					}
				}
			}
		};

		expect(docs).toEqual(expectedDocs);
	})
});