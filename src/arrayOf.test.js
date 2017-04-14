import { arrayOf, string, number, shape } from './index';
import ReactPropTypes from 'prop-types';
import { ReactPropTypesSecret } from './utils';

const dummyProps = {
	astring: 'hello',
	anarrayofnumbers: [1, 2, 3],
	anarrayofshape:[{ x: 2 }, { x: 4 }]
};

describe('arrayOf', () => {
	test('returns correct displayName', () => {
		const { displayName } = arrayOf(string)();

		expect(displayName).toEqual('Array of type String');
	});

	test('returns correct required value', () => {
		const isRequired = arrayOf.isRequired(number)().required;
		const notRequired = arrayOf(number)().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = arrayOf(number)();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.arrayOf(ReactPropTypes.number);

		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anarrayofnumbers', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anarrayofnumbers', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anarrayofshape', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anarrayofshape', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = arrayOf.isRequired(number)();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.arrayOf(ReactPropTypes.number).isRequired;

		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anarrayofnumbers', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anarrayofnumbers', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anarrayofshape', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anarrayofshape', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = arrayOf(number)();

		const prop = {
			type: arrayOf(number),
			description: 'Array of numbers'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Array of type Number',
			required: false,
			description: 'Array of numbers',
			arrayOf: {
				type: 'Number',
				required: false
			}
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = arrayOf.isRequired(number)();

		const prop = {
			type: arrayOf.isRequired(number),
			description: 'Array of numbers'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Array of type Number',
			required: true,
			description: 'Array of numbers',
			arrayOf: {
				type: 'Number',
				required: false
			}
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object with deep shape', () => {
		const theShape = {
			type: shape({
				astring: {
					type: string,
					description: 'A string'
				}
			}),
			description: 'A shape obj'
		}


		const { getDocs } = arrayOf(theShape)();

		const prop = {
			type: arrayOf(theShape),
			description: 'Array of shapes'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Array of type Shape',
			required: false,
			description: 'Array of shapes',
			arrayOf: {
				type: 'Shape',
				required: false,
				description: 'A shape obj',
				shape: {
					astring: {
						type: 'String',
						required: false,
						description: 'A string'
					}
				}
			}
		};

		expect(docs).toEqual(expectedDocs);
	});
});