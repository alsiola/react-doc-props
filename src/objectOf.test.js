import { objectOf, string, number, shape } from './index';
import ReactPropTypes from 'prop-types';
import { ReactPropTypesSecret } from './utils';

const dummyProps = {
	astring: 'hello',
	anobjectofmixed: { x: 'x', y: 3},
	anobjectofnumber: { x: 2, y: 3}
};

describe('arrayOf', () => {
	test('returns correct displayName', () => {
		const { displayName } = objectOf(string)();

		expect(displayName).toEqual('Object with String property values');
	});

	test('returns correct required value', () => {
		const isRequired = objectOf.isRequired(number)().required;
		const notRequired = objectOf(number)().required;

		expect(isRequired).toEqual(true);
		expect(notRequired).toEqual(false);
	})

	test('returns correct proptype when not required', () => {
		const { getReactPT } = objectOf(number)();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.objectOf(ReactPropTypes.number);

		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anobjectofmixed', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anobjectofmixed', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anobjectofnumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anobjectofnumber', 'dummy', 'test', null, ReactPropTypesSecret));
	});

	test('returns correct proptype when required', () => {
		const { getReactPT } = objectOf.isRequired(number)();
		const reactPT = getReactPT();
		const realReactPT = ReactPropTypes.objectOf(ReactPropTypes.number).isRequired;

		expect(reactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'undef', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'astring', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anobjectofmixed', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anobjectofmixed', 'dummy', 'test', null, ReactPropTypesSecret));
		expect(reactPT(dummyProps, 'anobjectofnumber', 'dummy', 'test', null, ReactPropTypesSecret)).toEqual(realReactPT(dummyProps, 'anobjectofnumber', 'dummy', 'test', null, ReactPropTypesSecret));	});

	test('produces correct documentation object when not required', () => {
		const { getDocs } = objectOf(number)();

		const prop = {
			type: objectOf(number),
			description: 'Object of numbers'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Object with Number property values',
			required: false,
			description: 'Object of numbers',
			objectOf: {
				type: 'Number',
				required: false
			}
		};

		expect(docs).toEqual(expectedDocs);
	});

	test('produces correct documentation object when required', () => {
		const { getDocs } = objectOf(number)();

		const prop = {
			type: objectOf(number),
			description: 'Object of numbers'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Object with Number property values',
			required: false,
			description: 'Object of numbers',
			objectOf: {
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


		const { getDocs } = objectOf(theShape)();

		const prop = {
			type: objectOf(theShape),
			description: 'Object of shapes'
		};

		const docs = getDocs(prop);

		const expectedDocs = {
			type: 'Object with Shape property values',
			required: false,
			description: 'Object of shapes',
			objectOf: {
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